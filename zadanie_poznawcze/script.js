window.onload = function() {
    const videos = [
        'https://www.industryplant.xyz/videos/ZZadanie_Proba.mp4',
        'https://www.industryplant.xyz/videos/Zadanie_1_Eksperymentalne.mp4',
        'https://www.industryplant.xyz/videos/Zadanie_2_Eksperymentalne.mp4',
        'https://www.industryplant.xyz/videos/Zadanie_3_Eksperymentalne.mp4',
        'https://www.industryplant.xyz/videos/Zadanie_4_Eksperymentalne.mp4'
    ];

    let currentVideoIndex = 0;

    const startButton = document.getElementById('startButton');
    const instructionContainer = document.getElementById('instruction-container');
    const videoContainer = document.getElementById('video-container');

    if (startButton && instructionContainer && videoContainer) {
        startButton.addEventListener('click', function() {
            instructionContainer.style.display = 'none';
            videoContainer.style.display = 'block';
            showTaskLabel('Zadanie próbne', 5000);
        });
    } else {
        console.error('Some elements do not exist in the DOM');
    }

    function showTaskLabel(label, duration) {
        if (videoContainer) {
            videoContainer.innerHTML = `<h2>${label}</h2>`;
            setTimeout(function() {
                loadVideo(currentVideoIndex);
            }, duration);
        }
    }

    function loadVideo(index) {
        if (videoContainer) {
            videoContainer.innerHTML = `<video id="current-video" width="640" height="360" autoplay muted oncontextmenu="return false;" style="pointer-events: none;">
                <source src="${videos[index]}" type="video/mp4">
                Twoja przeglądarka nie wspiera tagu video.
            </video>`;

            const video = document.getElementById('current-video');
            if (video) {
                video.onended = function() {
                    displayResponseForm();
                };
            }
        }
    }
    
    function displayResponseForm() {
        const responseForm = document.getElementById('response-form');
        if (responseForm) {
            responseForm.innerHTML = `
                <h2>Wybierz cechę figury z filmiku:</h2>
                <select id="response-select">
                    <option value="capital">Figura ma literę "R"</option>
                    <option value="small">Figura ma literę "r"</option>
                    <option value="large">Figura jest duża</option>
                    <option value="small_size">Figura jest mała</option>
                    <option value="square">Figura jest kwadratem</option>
                    <option value="triangle">Figura jest trójkątem</option>
                    <option value="upper">Figura ma kreskę u góry</option>
                    <option value="lower">Figura ma kreskę u dołu</option>
                    <option value="plain">Figura jest gładka</option>
                    <option value="patterned">Figura jest kreskowana</option>
                </select>
                <button id="submitButton">Zatwierdź odpowiedź</button>
            `;
            responseForm.style.display = 'block';
            
            const submitButton = document.getElementById('submitButton');
            if (submitButton) {
                submitButton.addEventListener('click', submitResponse);
            }
        }
    }

    function submitResponse() {
        const responseForm = document.getElementById('response-form');
        if (responseForm) {
            responseForm.style.display = 'none';
            if (currentVideoIndex === 0) {
                alert("Poprawną odpowiedzią było 'Figura jest trójkątem'. Teraz już nie będzie podawana prawidłowa odpowiedź i będziesz musiał/a klikać samodzielnie.");
            }

            if (currentVideoIndex < videos.length - 1) {
                currentVideoIndex++;
                showTaskLabel(`Zadanie ${currentVideoIndex + 1}`, 5000);
            } else {
                window.location.href = 'https://tally.so/r/3jBazR';
            }
        }
    }
};
