from django.shortcuts import render


# Create your views here.
def index(request):
    """
    Render the index page of the chat application.
    """
    return render(request, 'chat/index.html')


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})
