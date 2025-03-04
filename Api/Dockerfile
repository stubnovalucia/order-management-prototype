FROM python:3.11.1

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose FastAPI port
EXPOSE 8000


# Command to run FastAPI
CMD uvicorn app.main:app --host 0.0.0.0 --port 8000

