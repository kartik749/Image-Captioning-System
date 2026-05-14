from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from transformers import BlipProcessor, BlipForConditionalGeneration
import io
import torch

app = FastAPI()

# CORS — allow the React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device optimization
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load model once (startup)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Load trained weights
checkpoint = torch.load("model/image_caption_model.pth", map_location=device)
model.load_state_dict(checkpoint["model_state_dict"], strict=False)

model.to(device)
model.eval()

@app.post('/caption')
async def generate_caption(file: UploadFile = File(...)):

    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # Preprocess
    inputs = processor(images=image, return_tensors="pt").to(device)

    # Inference
    with torch.no_grad():
        output = model.generate(**inputs, max_length=100)

    # Decode
    caption = processor.decode(output[0], skip_special_tokens=True)

    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "caption": caption
        }
    )