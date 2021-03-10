$(document).ready(function () {
    let a, b;
    let winnerArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
    let checkArray = []
    let randomArray;
    let imgArray = [
        '<img src="cut_images/image_part_001.jpg" data-number="1">',
        '<img src="cut_images/image_part_002.jpg" data-number="2">',
        '<img src="cut_images/image_part_003.jpg" data-number="3">',
        '<img src="cut_images/image_part_004.jpg" data-number="4">',
        '<img src="cut_images/image_part_005.jpg" data-number="5">',
        '<img src="cut_images/image_part_006.jpg" data-number="6">',
        '<img src="cut_images/image_part_007.jpg" data-number="7">',
        '<img src="cut_images/image_part_008.jpg" data-number="8">',
        '<img src="cut_images/image_part_009.jpg" data-number="9">',
        '<img src="cut_images/image_part_010.jpg" data-number="10">',
        '<img src="cut_images/image_part_011.jpg" data-number="11">',
        '<img src="cut_images/image_part_012.jpg" data-number="12">',
        '<img src="cut_images/image_part_013.jpg" data-number="13">',
        '<img src="cut_images/image_part_014.jpg" data-number="14">',
        '<img src="cut_images/image_part_015.jpg" data-number="15">',
        '<img src="cut_images/image_part_016.jpg" data-number="16">',
    ];

    function random() {
        randomArray = imgArray.sort(function () {
            return 0.5 - Math.random();
        });

        for (let i = 0; i < $('.dragElem').length; i++) {
            $('.dragElem').eq(i).html(randomArray[i])
        }
        for (let k = 0; k < 16; k++) {
            $('.dropElem').eq(k).html('');
        }
    }

    function dragDrop() {
        $('img').draggable({
            snap: 'img, .dropElem',
            snapTolerance: 15,
            cursor: "move",
            cursorAt: {top: 60, left: 50},

        })
        $('.dropElem').droppable({
            accept: 'img',
            tolerance: 'pointer',
            drop: function () {
                a = event.target
                b = a.dataset.number
                $(this).html(`<p>${b}</p>`)
            }
        })
    }

    random();
    dragDrop();

    function randomClick() {
        random();
        dragDrop();
        stopTimer();
        $('.start').prop("disabled", false);
        $('.check').prop("disabled", false);
        isEvent = false;
    }

    $('.random').on('click', randomClick);

    $('.reset').on('click', function () {
        randomClick();
        $('.modal').css('display', 'none');
        $('.checkText').css('display', 'block');
        $('.win').css('display', 'none');
        $('.lose').css('display', 'none');
        $('.close').css('display', 'block');
        $('.check').css('display', 'block');
        $('.reset').css('display', 'none');
    })

    $('.check').on('click', function () {
        for (let i = 0; i < 16; i++) {
            checkArray.push($('.dropElem').eq(i).text())
        }

        if (JSON.stringify(checkArray) == JSON.stringify(winnerArray)) {
            stopTimer();
            $('.modal').css('display', 'block');
            $('.win').css('display', 'block');
            $('.checkText').css('display', 'none');
            $('.check').css('display', 'none');
            $('.close').css('display', 'none');
            $('.reset').css('display', 'block');
        } else {
            stopTimer();
            $('.modal').css('display', 'block');
            $('.lose').css('display', 'block');
            $('.checkText').css('display', 'none');
            $('.check').css('display', 'none');
            $('.close').css('display', 'none');
            $('.reset').css('display', 'block');
        }
        checkArray = [];
    })

    let interval;
    let sec = 0, min = 1;
    $('.time').html(`0${min}:0${sec}`);

    function startTimer() {
        interval = setInterval(timeToLow, 1000)
    }

    function stopTimer() {
        clearInterval(interval);
        sec = 0;
        min = 1;
        $('.time').html(`0${min}:0${sec}`);
    }

    function timeToLow() {
        if (sec === 0) {
            min--;
            sec = 60;
        }
        sec--;
        if (sec < 10) {
            $('.time').html(`0${min}:0${sec}`);
        } else {
            $('.time').html(`0${min}:${sec}`);
        }
        if (sec === 0 && min === 0) {
            stopTimer();
            $('.modal').css('display', 'block');
            $('.lose').css('display', 'block');
            $('.checkText').css('display', 'none');
            $('.check').css('display', 'none');
            $('.start').prop("disabled", false);
            $('.checkResult').prop("disabled", true);
            $('.close').css('display', 'none');
            $('.reset').css('display', 'block');
        }
    }

    let isEvent = false;

    $('.start').on('click', function () {
        startTimer();
        $('.start').prop("disabled", true);
        $('.checkResult').prop("disabled", false);
        isEvent = true;
    })

    $('.dragElem').on('mousedown', function () {
        if (!isEvent) {
            startTimer();
            $('.start').prop("disabled", true);
            $('.checkResult').prop("disabled", false);
            isEvent = true;
        }
    })

    $('.checkResult').on('click', function () {
        $('.modal').css('display', 'block');
    })

    $('.close').on('click', function () {
        $('.modal').css('display', 'none');
        $('.checkText').css('display', 'block');
        $('.win').css('display', 'none');
        $('.lose').css('display', 'none');
        $('.check').css('display', 'block');
    })
})