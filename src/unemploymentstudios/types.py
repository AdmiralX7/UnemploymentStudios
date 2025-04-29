# Types.py 
from typing import List, Dict, Literal, Optional
from pydantic import BaseModel, Field

# ---------------------------------------
# 1. Core Game Conceptualization Models
# ---------------------------------------

class Character(BaseModel):
    name: str
    role: str  # e.g., Protagonist, Antagonist, Supporting
    description: str
    abilities: Optional[List[str]] = None
    emotional_arc: Optional[str] = None

class Level(BaseModel):
    name: str
    description: str
    difficulty: str
    # difficulty: Literal["Easy", "Medium", "Hard", "Boss"]
    key_objectives: List[str]
    enemies_obstacles: List[str]
    boss_battle: Optional[str] = None

class GameConcept(BaseModel):
    title: str
    tagline: str
    overview: str
    main_character: Character
    supporting_characters: List[Character]
    world_building: str
    levels: List[Level]
    gameplay_mechanics: List[str]
    visual_style: str
    audio_style: str
    emotional_arc: str
    conclusion: str

# ---------------------------------------
# 2. Technical Planning Models
# ---------------------------------------

class FileSpec(BaseModel):
    filename: str
    purpose: str
    content_guidelines: str
    dependencies: Optional[List[str]] = Field(default_factory=list)

class FileStructureSpec(BaseModel):
    files: List[FileSpec]

# ---------------------------------------
# 3. Asset Specification Models
# ---------------------------------------

class ImageAssetSpec(BaseModel):
    """Specification for an image asset to be generated."""
    asset_id: str
    asset_type: str = Field(..., description="e.g., character, environment, ui, logo")
    filename: str = Field(..., description="Path where the image should be saved")
    prompt: str = Field(..., description="Detailed prompt for DALL-E image generation")
    size: str = Field("1024x1024", description="Image resolution")
    style: str = Field(..., description="Visual style description")
    importance: int = Field(1, description="Priority level, 1 (highest) to 5 (lowest)")
    description: str = Field(..., description="Description of the asset's purpose/role in the game")

class AudioAssetSpec(BaseModel):
    """Specification for an audio asset to be sourced."""
    asset_id: str
    asset_type: str = Field(..., description="e.g., effect, music, ambient, ui")
    filename: str = Field(..., description="Path where the audio should be saved")
    query: str = Field(..., description="Search terms for Freesound")
    description: str = Field(..., description="Description of the sound and its purpose/role")
    importance: int = Field(1, description="Priority level, 1 (highest) to 5 (lowest)")
    desired_duration: Optional[str] = Field(None, description="Ideal length of audio clip")

class AssetSpecCollection(BaseModel):
    """Collection of all asset specifications for the game."""
    image_assets: List[ImageAssetSpec] = Field(default_factory=list)
    audio_assets: List[AudioAssetSpec] = Field(default_factory=list)

# ---------------------------------------
# 3. File Development and Tracking Models
# ---------------------------------------

class GameFile(BaseModel):
    filename: str
    filetype: Literal["html", "css", "js", "audio", "json", "asset"]
    content: str
    status: Literal["draft", "under_review", "approved", "needs_revision"]

'''
class GameFile(BaseModel):
    filename: str
    filetype: Literal["html", "css", "js", "audio", "json", "asset"]
    content: str
    responsible_crew: str  # e.g., "Core JavaScript Crew", "Audio Crew"
    status: Literal["draft", "under_review", "approved", "needs_revision"]

class GameFile(BaseModel):
    filename: str
    filetype: Literal["html", "css", "js", "audio", "json", "asset"]
    content: str
    responsible_crew: str  # e.g., "Core JavaScript Crew", "Audio Crew"
    status: Literal["draft", "under_review", "approved", "needs_revision"]
    revision_history: Optional[List[str]] = Field(default_factory=list)
'''

# ---------------------------------------
# 4. Quality Assurance & Feedback Models
# ---------------------------------------

'''
class ReviewerType(Literal["AI", "Technical QA", "Gameplay QA", "Human QA"]):
    pass
'''

ReviewerType = Literal["AI", "Technical QA", "Gameplay QA", "Human QA"]


class QAFeedback(BaseModel):
    filename: str
    reviewer: str
    reviewer_type: ReviewerType
    status: Literal["passed", "correction_needed", "failed"]
    comments: Optional[str] = None
    suggestions: Optional[List[str]] = Field(default_factory=list)
    review_timestamp: Optional[str] = None

class FeedbackLoop(BaseModel):
    file: GameFile
    feedback_history: List[QAFeedback] = Field(default_factory=list)
    review_attempts: int = 0
    max_attempts: int = 3

# ---------------------------------------
# 5. Project-Wide Knowledge Base Model
# ---------------------------------------

class KnowledgeBaseEntry(BaseModel):
    topic: str
    issue_description: str
    solution: Optional[str] = None
    references: Optional[List[str]] = Field(default_factory=list)

class KnowledgeBase(BaseModel):
    entries: List[KnowledgeBaseEntry]

# ---------------------------------------
# 6. Project Management Models
# ---------------------------------------

class CrewMember(BaseModel):
    name: str
    role: str
    specialization: Optional[str] = None

class Crew(BaseModel):
    name: str
    members: List[CrewMember]
    current_task: Optional[str] = None
    completed_tasks: Optional[List[str]] = Field(default_factory=list)

class ProjectTimelineEntry(BaseModel):
    phase: str
    tasks: List[str]
    assigned_crew: List[str]
    deadline: Optional[str] = None
    status: Literal["pending", "in_progress", "completed", "overdue"]

class ProjectTimeline(BaseModel):
    entries: List[ProjectTimelineEntry]
