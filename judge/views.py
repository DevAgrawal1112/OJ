# Create your views here.
from datetime import timezone
import imp
from multiprocessing import AuthenticationError
import re
from cv2 import destroyAllWindows
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from requests import request
from .models import User, Problem, Solution, TestCase, User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.views import generic
from .forms import NewUserForm
import os, filecmp

def login_req(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"Yu are now logged in as {username}.")
                return redirect("/problems/")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request, template_name="judge/login.html", content={"login_form":form})

def register(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("/problems")
        messages.error(request, "Unsuccesful registration. Invalid information")
    form = NewUserForm()
    return render (request=request, template_name="judge/register.html", context={"register_form":form})

def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect("/")

def problems(request):
    problem_list = Problem.objects.all()
    context = {'problem_list': problem_list}
    return render(request, 'judge/index.html', context)

def problemDetail(request, problem_id):
    problem = get_object_or_404(Problem, pk = problem_id)
    return render(request, 'judge/detail.html', {'problem':problem})

def submitProblem(request, problem_id):
    Problem = get_object_or_404(Problem, pk = problem_id)
    f = request.FILES['solution']
    with open('/data/input/correct_code/problem_1_correct.cpp','wb++') as dest:
        for chunk in f.chunks():
            destroyAllWindows.write(chunk)
    

    out1 = 'C:\Users\agraw\OneDrive\Documents\project using django\OJ\judge\data\input\correct_code\problem_1_correct.cpp'
    out2 = ''
    if (filecmp.cmp(out1, out2, shallow=False)):
        verdict = 'Accepted'
    else:
        verdict = 'Wrong Answer'

    solution = Solution()
    solution.verdit = verdict
    solution.submission_time = timezone.now()
    solution.submission_code = '' 
    solution.save()

    return HttpResponseRedirect(reverse(''))

def leaderboard(request):
    solution = Solution.objects.all()
    return render(request, 'judge/leaderboard.html', {'solutions': solution})



