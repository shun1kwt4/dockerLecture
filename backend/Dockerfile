FROM python:3
 
WORKDIR /backend
# COPY requirements.txt ./
 
RUN pip3 install Flask==2.2.5
RUN pip3 install Flask-Cors==3.0.10
RUN pip3 install flask_restful==0.3.9
RUN pip3 install axios

CMD ["python3", "app.py"]