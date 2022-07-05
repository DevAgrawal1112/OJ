from django.db import models

class User(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Problem(models.Model):
    problem_code = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    statement = models.TextField()
    difficulty = models.CharField(max_length = 100)

    def __str__(self):
        return self.problem_code

class Solution(models.Model):
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE)
    verdit = models.CharField(max_length=100)
    submission_time = models.DateTimeField()
    submission_code = models.DateTimeField('submitted at')

    def __str__(self):
        return self.verdict

class TestCase(models.Model):
    input = models.TextField()
    output = models.TextField()
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE)

    def __str__(self):
        return self.input