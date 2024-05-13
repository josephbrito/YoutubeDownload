import tempfile
from django.shortcuts import render
from django.http import FileResponse

from pytube import YouTube
import os
 
def DownloadVideo(req):
    url = req.POST['link']
    midia_format = req.POST['format']
    yt = YouTube(url)

    try:
        if midia_format == "song":
            video = yt.streams.filter(only_audio=True).first()
            destination = 'output/'
            out_file = video.download(output_path=destination)
            base, ext = os.path.splitext(out_file)
            new_file = base + '.mp3'
            os.rename(out_file, new_file)

            audio_file = open(os.path.join('output/', new_file), 'rb')
            
            return FileResponse(audio_file, as_attachment=True)

        elif midia_format == "video":
            destination = 'output/'
            out_file = yt.streams.get_highest_resolution().download(output_path=destination)
            base, ext = os.path.splitext(out_file)
            new_file = base + '.mp4'
            os.rename(out_file, new_file)
            print("Video downloaded")
            video_file = open(os.path.join('output/', new_file), 'rb')

            return FileResponse(video_file, as_attachment=True)
        else:
            return
    except Exception as e:
        print("An error ocurred: ")
        print(e)
        return

def index(req):
    return render(req, 'youtube/index.html')