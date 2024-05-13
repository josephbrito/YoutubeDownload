$(document).ready(function() {
    $('#btn-mp3').on('click', function() {
        $(this).css({
            'background': '#fff',
            'color': '#000'
        });

        $('#btn-mp4').css({
            'background': 'rgba(0,0,0,.4)',
            'color': '#fff'
        });

        $('#format').val('song');
    });

    $('#btn-mp4').on('click', function() {
        $(this).css({
            'background': '#fff',
            'color': '#000'
        });

        $('#btn-mp3').css({
            'background': 'rgba(0,0,0,.4)',
            'color': '#fff'
        });

        $('#format').val('video');
    });

    $('.button-download').on('click', () => {
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    
        const link_url = $('#url').val();
        const format_media = $('#format').val();

        if(!link_url) {
            alert('Insira uma URL para prosseguir!');
            return;
        }
        $.ajax({
            type: 'post',
            url: '/download',
            data: { link: link_url, format: format_media },
            xhrFields: {
                responseType: 'blob'
            },
            beforeSend: function (xhr){
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
                $('.loader-container').css('display', 'flex');
            },
            success: function (res, txt, request) {
                const download_name = request.getResponseHeader('Content-Disposition').split('filename=')[1].replaceAll('"', '');

                if(document.getElementById('download-btn')) {
                    $('#download-btn').remove();
                }

                $('.loader-container').css('display', 'none');

                let url = window.URL.createObjectURL(res);
    
                let a_html = `
                <i class="fa-solid fa-download"></i>
                Download
                `;

                let a = document.createElement('a');

                a.id = 'download-btn';
            
                a.classList.add('btn');
                a.classList.add('button-download');
                a.insertAdjacentHTML('beforeend', a_html);
                a.href = url;
                a.download = download_name
                $('.button-container').append(a)
                a.click();
            
                window.URL.revokeObjectURL(url);
            },
            error: function(err) {
                console.log('deu errado');
                $('.loader-container').css('display', 'none');
            }
        })
    });
});