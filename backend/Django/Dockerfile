FROM python:3.9.11

WORKDIR /app

RUN pip install gunicorn

COPY requirements.txt ./

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "testproject.wsgi", "--bind", "0.0.0.0:8082"]
