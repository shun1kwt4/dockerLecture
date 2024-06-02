FROM python:3

WORKDIR /backend
COPY ./backend/requirements.txt /backend

RUN pip3 install -r requirements.txt

CMD ["python3", "app.py"]