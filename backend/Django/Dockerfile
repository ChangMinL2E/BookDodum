FROM python:3.9.11

WORKDIR /app

RUN pip install gunicorn

COPY requirements.txt ./

RUN pip install --upgrade pip 

RUN python -m venv venv  //

RUN . venv/bin/activate

# RUN pip install -r requirements.txt //

RUN python manage.py migrate

# RUN python manage.py loaddata books.json //

# RUN python manage.py runserver 

COPY . .

# CMD ["gunicorn", "testproject.wsgi", "--bind", "0.0.0.0:8082"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8082"]
