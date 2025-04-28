import base64
from openai import OpenAI
from pydantic import BaseModel, Field
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai import LLM
from crewai_tools import DallETool
from crewai.tools import BaseTool
import os
import re
import json
import pathlib
import requests
import dotenv

dotenv.load_dotenv()

from typing import Any, List, Optional, Type

from bs4 import BeautifulSoup    
# ---------------------------------------------------------------------------
#  SaveDalleImageTool – generates + downloads image to ./assets/images/
# ---------------------------------------------------------------------------
import requests, os, pathlib, json, uuid
from typing import Any

# --------------------------- The actual Tool class ---------------------------
class GenerateAndDownloadImageSchema(BaseModel):
    prompt          : str = Field(..., description="Prompt for DALL·E")
    file_name       : str = Field(..., description="Where to save the image (PNG)")
    size            : str = Field("1024x1024", description="Image resolution")
    response_format : str = Field("url", description="url or b64_json")
    model           : str = Field("dall-e-3", description="DALL·E model name")
    n               : int = Field(1, description="Number of images (1)")

class GenerateAndDownloadImageTool(BaseTool):
    """
    A single tool that generates an image via OpenAI’s DALL·E API
    and downloads it locally (**url** or **b64_json** variant).
    """
    name        : str = "generate_and_download_image"
    description : str = (
        "Generate an image from a prompt via DALL·E, "
        "then download the resulting image to file."
    )
    args_schema : Type[BaseModel] = GenerateAndDownloadImageSchema

    # -------------------- sync entry‑point CrewAI will call ------------------
    def _run(self, **kwargs) -> Any:
        prompt          = kwargs["prompt"]
        file_name       = kwargs["file_name"]
        size            = kwargs.get("size", "1024x1024")
        response_format = kwargs.get("response_format", "url")
        model           = "dall-e-3"
        n               = 1

        # -- Make sure OPENAI_API_KEY is set
        openai_key = "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"
        if not openai_key:
            return "OPENAI_API_KEY is not set in the environment."

        # -- Configure client
        client = OpenAI(api_key=openai_key)

        # -- Call DALL·E
        response = client.images.generate(
            prompt=prompt,
            n=n,
            size="1024x1024",
            response_format=response_format,
            model=model,
        )
        response_dict = response.model_dump(mode="python")

        if not response_dict or "data" not in response_dict or len(response_dict["data"]) == 0:
            return "No image data returned from DALL·E."

        # ---------------------------------------------------------
        # Depending on the response format, extract the image data
        # ---------------------------------------------------------
        if response_format == "url":
            image_url = response_dict["data"][0]["url"]

            # Download the image from the URL
            r = requests.get(image_url, timeout=30)
            r.raise_for_status()

            # Ensure folder exists
            pathlib.Path(file_name).expanduser().parent.mkdir(parents=True, exist_ok=True)
            with open(file_name, "wb") as f:
                f.write(r.content)

            return json.dumps(
                {
                    "message": f"Image generated and saved as {file_name}.",
                    "url": image_url,
                },
                indent=2,
            )

        else:  # b64_json
            b64_data    = response_dict["data"][0]["b64_json"]
            image_bytes = b64_data.encode("utf-8")
            decoded     = base64.decodebytes(image_bytes)

            pathlib.Path(file_name).expanduser().parent.mkdir(parents=True, exist_ok=True)
            with open(file_name, "wb") as f:
                f.write(decoded)

            return json.dumps(
                {
                    "message": f"Image generated (base64) and saved as {file_name}",
                },
                indent=2,
            )

    # async wrapper for CrewAI compliance
    async def _arun(self, **kwargs) -> Any:
        return self._run(**kwargs)
class SearchAndSaveSoundToolArgs(BaseModel):
    """Arguments accepted by SearchAndSaveSoundTool."""
    query: str = Field(..., description="Search text for the Freesound query")
    output_path: str = Field(
        ...,
        description="Absolute or relative path (including filename) where the preview will be written"
    )
    max_results: Optional[int] = Field(
        5,
        description="Maximum number of results to consider (the first hit will be downloaded)"
    )

class SearchAndSaveSoundTool(BaseTool):
    args_schema: Type[BaseModel] = SearchAndSaveSoundToolArgs
    name: str = "search_and_save_sound"
    description: str = (
        "Search for a sound on Freesound and save the first result's preview locally."
        " The sound will be saved in the specified output path."
    )
    def _run(self, *, query: str, output_path: str, max_results: int = 5, **_) -> Any:
        api_key = "tywbJyFLonrEAkWhUoSIyK7VLKOZiLVO7u9Pm6ea"
        if not api_key:
            return json.dumps({"error": "FREESOUND_API_KEY not set in environment variables."})

        headers = {"Authorization": f"Token {api_key}"}
        
        try:
            # Step 1: Search Freesound API for sounds
            search_url = "https://freesound.org/apiv2/search/text/"
            params = {
                "query": query,
                "page_size": max_results,
                "fields": "id,name,previews,url,license,username"
            }
            response = requests.get(search_url, headers=headers, params=params, timeout=60)
            response.raise_for_status()
            data = response.json()

            if "results" not in data or len(data["results"]) == 0:
                return json.dumps({"error": f"No search results found for query: {query}"})

            # Step 2: Loop through results to find valid preview
            results = data["results"]

            chosen_sound = None
            preview_url = None

            for candidate in results:
                previews = candidate.get("previews", {})
                candidate_preview = previews.get("preview-hq-mp3") or previews.get("preview-lq-mp3")
                if candidate_preview:
                    chosen_sound = candidate
                    preview_url = candidate_preview
                    break


            if not preview_url:
                return json.dumps({"error": f"No preview audio available in top results.{query}"})

            # Step 3: Download the preview audio
            audio_data = requests.get(preview_url, timeout=15)
            audio_data.raise_for_status()

            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            # Save the audio file
            with open(output_path, "wb") as f:
                f.write(audio_data.content)

            # Step 4: Scrape a short description from Freesound page
            url = f"https://freesound.org/people/{chosen_sound['username']}/sounds/{chosen_sound['id']}/"

            try:
                page = requests.get(url, timeout=15)
                soup = BeautifulSoup(page.content, "html.parser")
                desc_section = soup.find(id="soundDescriptionSection")
                raw_desc = re.sub(r"<.*?>", "", str(desc_section)) if desc_section else ""
            except Exception:
                raw_desc = "N/A"

            # Step 5: Build and return response
            response_data = {
                "chosen_sound_id": chosen_sound["id"],
                "name": chosen_sound["name"],
                "description": raw_desc.strip(),
                "saved_path": output_path
            }
            return json.dumps(response_data, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Failed to fetch or save audio: {str(e)}"})

    async def _arun(self, **kwargs) -> Any:
        return self._run(**kwargs)
@CrewBase
class AssetGenerationCrew:
    """Asset Generation Crew for game development"""
    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"


    # Basic configuration
    llm = LLM(model="gpt-4o")


    # --------------------------------------------------
    # AGENTS
    # --------------------------------------------------
    @agent
    def graphic_designer(self) -> Agent:
        return Agent(
            config=self.agents_config["graphic_designer"],
            llm=self.llm
        )
    @agent
    def sound_designer(self) -> Agent:
        return Agent(
            config=self.agents_config["sound_designer"],
            llm=self.llm
        )


    @agent
    def ui_designer(self) -> Agent:
        return Agent(
            config=self.agents_config["ui_designer"],
            llm=self.llm
        )


    @agent
    def asset_manager(self) -> Agent:
        return Agent(
            config=self.agents_config["asset_manager"],
            llm=self.llm
        )
    @agent
    def image_generator(self) -> Agent:
        return Agent(
            config=self.agents_config["image_generator"],
            tools=[GenerateAndDownloadImageTool(result_as_answer=True)],   # 🟢 now saves files
            llm=self.llm,
        )
    @agent
    def audio_sourcer(self) -> Agent:
        """Fetches & normalises audio via the custom Freesound tool."""
        fs_tool = SearchAndSaveSoundTool(result_as_answer=True)      # ← uses the code you supplied
        return Agent(
            config=self.agents_config["audio_sourcer"],
            tools=[fs_tool],
            llm=self.llm,
        )
    @agent
    def asset_integrator(self) -> Agent:
        """Agent that pipes finished assets into the codebase / repo."""
        return Agent(config=self.agents_config["asset_integrator"], llm=self.llm)


    # --------------------------------------------------
    # TASKS
    # --------------------------------------------------
    @task
    def analyze_asset_requirements(self) -> Task:
        return Task(
            config=self.tasks_config["analyze_asset_requirements"]
        )


    @task
    def design_character_assets(self) -> Task:
        return Task(
            config=self.tasks_config["design_character_assets"],
            context=[self.analyze_asset_requirements()]
        )


    @task
    def design_environment_assets(self) -> Task:
        return Task(
            config=self.tasks_config["design_environment_assets"],
            context=[self.analyze_asset_requirements()]
        )


    @task
    def design_ui_elements(self) -> Task:
        return Task(
            config=self.tasks_config["design_ui_elements"],
            context=[self.analyze_asset_requirements()]
        )


    @task
    def create_sound_effects(self) -> Task:
        return Task(
            config=self.tasks_config["create_sound_effects"],
            context=[self.analyze_asset_requirements()]
        )


    @task
    def create_background_music(self) -> Task:
        return Task(
            config=self.tasks_config["create_background_music"],
            context=[self.analyze_asset_requirements()]
        )


    @task
    def finalize_assets(self) -> Task:
        return Task(
            config=self.tasks_config["finalize_assets"],
            context=[
                self.analyze_asset_requirements(),
                self.design_character_assets(),
                self.design_environment_assets(),
                self.design_ui_elements(),
                self.create_sound_effects(),
                self.create_background_music()
            ]
        )
    @task
    def generate_visual_assets(self) -> Task:
        return Task(
            config=self.tasks_config["generate_visual_assets"],
            context=[self.analyze_asset_requirements()],
        )


    @task
    def source_audio_assets(self) -> Task:
        return Task(
            config=self.tasks_config["source_audio_assets"],
            context=[self.analyze_asset_requirements()],
        )


    @task
    def integrate_assets(self) -> Task:
        return Task(
            config=self.tasks_config["integrate_assets"],
            context=[
                self.generate_visual_assets(),
                self.source_audio_assets(),
                self.finalize_assets(),
            ],
        )


    # --------------------------------------------------
    # CREW
    # --------------------------------------------------
    @crew
    def crew(self) -> Crew:
        """Create the crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )
if __name__ == "__main__":
    # Initialize the crew
    ag_crew = AssetGenerationCrew()
    crew_instance = ag_crew.crew()

    # Build dummy inputs just to allow the tasks to kick off
    asset_inputs = {
        "main_character": {"name": "Test Hero", "description": "A brave warrior."},
        "supporting_characters": [{"name": "Sidekick", "description": "Helpful companion."}],
        "world_building": "Fantasy forest setting",
        "levels": [{"name": "Level 1", "description": "Starting village"}],
        "visual_style": "Pixel art retro",
        "audio_style": "8-bit chiptune",
        "title": "Test Adventure",
        "date": "20240501",
    }

    # Run the Crew with the dummy inputs
    output = crew_instance.kickoff(inputs=asset_inputs)
    print("\n=== ASSET GENERATION OUTPUT ===\n")
    print(output)
