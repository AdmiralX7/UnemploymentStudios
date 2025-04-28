import os
import json
import base64
import pathlib
import requests
from openai import OpenAI

# -----------------------------------------
# Parameters – you can change these values
# -----------------------------------------
PROMPT = "A cute pixel art wizard standing in a forest"
FILE_NAME = "./assets/images/test_wizard.png"
SIZE = "1024x1024"
RESPONSE_FORMAT = "url"  # or "b64_json"
MODEL = "dall-e-3"
N = 1

# -----------------------------------------
# Make sure your OpenAI API key is set
# -----------------------------------------
openai_key = "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"
if not openai_key:
    raise EnvironmentError("OPENAI_API_KEY is not set in the environment.")

# -----------------------------------------
# Call the OpenAI DALL·E API
# -----------------------------------------
client = OpenAI(api_key=openai_key)

response = client.images.generate(
    prompt=PROMPT,
    n=N,
    size=SIZE,
    response_format=RESPONSE_FORMAT,
    model=MODEL,
)

response_dict = response.model_dump(mode="python")

if not response_dict or "data" not in response_dict or len(response_dict["data"]) == 0:
    raise ValueError("No image data returned from DALL·E.")

# -----------------------------------------
# Save the image to disk
# -----------------------------------------
if RESPONSE_FORMAT == "url":
    image_url = response_dict["data"][0]["url"]
    r = requests.get(image_url, timeout=30)
    r.raise_for_status()

    pathlib.Path(FILE_NAME).expanduser().parent.mkdir(parents=True, exist_ok=True)
    with open(FILE_NAME, "wb") as f:
        f.write(r.content)

    print(json.dumps(
        {
            "message": f"Image generated and saved as {FILE_NAME}.",
            "url": image_url,
        },
        indent=2,
    ))

else:  # response_format == "b64_json"
    b64_data = response_dict["data"][0]["b64_json"]
