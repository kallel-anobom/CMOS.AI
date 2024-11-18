#Image Python
FROM python:3.11-slim

WORKDIR /app

#Install System Dependecies
RUN apt-get update && apt-get install -y \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

#Install Python Dependecies
COPY requirements.txt .

RUN pip install pipenv
RUN pip install --no-cache-dir -r requirements.txt

# Add User
ARG USER_ID=1000  # Valor padrão
ARG GROUP_ID=1000  # Valor padrão
RUN groupadd -g $GROUP_ID appgroup && \
  useradd -u $USER_ID -g appgroup -m appuser

USER appuser

#Copy Project Files
COPY . .

# Add the currente directory to PYTHONPATH
ENV PYTHONPATH=/app