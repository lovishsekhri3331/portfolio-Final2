//main.js
// routing for MMDB

function getSplash() {

    $(".search_results").html("");

    $(".hideAll").hide();

    // call splash XHR
    let getSplash = $.ajax({
        url: "services/splash.php",
        type: "POST",
        dataType: "json"
    });


    getSplash.done(
        function (data) {
            //alert("The dingo ate my data!");

            let content = "";

            $.each(data, function (i, item) {
                let movie_id = item.movie_id;
                let movie_name = item.movie_name;
                let cover_id = item.cover_id;
                let cover_name = item.cover_name;

                //console.log(lastName);
                content += `<div class="cell large-4">
                    <div data-id="${movie_id}" class="callout related_movie movie">
                    <img src="https://dca.durhamcollege.ca/~madmovies/uploads2/uploads/${cover_id}/${cover_name}" alt="${movie_name}">
                    <h4>${movie_name}</h4>
                    </div>
                </div>`;
            });

            // output to a div
            $(".splash_wrapper").html(content);

        }
    );

    getSplash.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSplash)" +
            textStatus);
    });

    // Populate splash div
    $(".splash").show();
}

function getMovie(id) {

    $(".search_results").html("");

    $(".hideAll").hide();

    $(".my_movie_images").slick("unslick");
    $(".cast_slider").slick("unslick");

    // call movie XHR
    let getMovie = $.ajax({
        url: "services/movie.php",
        type: "POST",
        data: {
            movie_id: id
        },
        dataType: "json"
    });


    getMovie.done(
        function (data) {
            //alert("The dingo ate my data!");

            let movie_name = data.movie_name;
            let run_length = data.run_length;
            let description = data.description;
            let cover_image_id = data.cover_image_id;
            let cover_image_name = data.cover_image_name;

            $(".movie_name").html(movie_name);
            $(".description_detail").html(description);
            $(".movie_length").html(run_length);

            let src = `<img src="https://dca.durhamcollege.ca/~madmovies/uploads2/uploads/${cover_image_id}/${cover_image_name}" alt="${movie_name}">`;
            $(".movie_poster").html(src);

            let youtube = data.youtube;
            let youtube_iframe = `<iframe width="100%" height="250px" src="https://www.youtube.com/embed/${youtube}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            $(".trailer").html("yesyesyes" + youtube_iframe);

            let content = "";

            $.each(data.cast, function (i, item) {

                let people_id = item.people_id;
                let name = item.name;
                let image_id = item.image_id;
                let image_name = item.image_name;
                let character_name = item.character_name;

                //console.log(lastName);
                content += `<div>
                                <div data-id="${people_id}" class="card people" style="height: 100%;">
                                    <div class="card-divider">
                                        <img src="https://dca.durhamcollege.ca/~madmovies/uploads2/uploads/${image_id}/${image_name}" alt="${name}">
                                    </div>
                                    <div class="card-section">
                                        <h4>${name}</h4>
                                        <p>${character_name}</p>
                                    </div>
                                </div>
                            </div>`;
            });

            // output to a div
            $(".cast_slider").html(content);
            initSliderCast();

            content = "N/A";

            $.each(data.genre, function (i, item) {

                if (content == "N/A") {
                    content = `${item}`;
                } else {
                    content += `, ${item}`;
                }

            });

            // output to a div
            $(".genre").html(content);

        }
    );

    getMovie.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getMovie)" +
            textStatus);
    });
    // put new info on screen and sliders
    // Populate movie div

    initSliderImages();



    //$(".movie").html("MOVIE: " + id + content);
    $(".movies").show();
}

function getPerson(id) {

    $(".search_results").html("");

    $(".hideAll").hide();
    // call people XHR
    // Populate people div

    let content = `<br>
    <ul>
        <li><a href="#/movie/133">MOVIE 133</a></li>
        <li><a href="#/movie/144">MOVIE 144</a></li>
        <li><a href="#/movie/155">MOVIE 155</a></li>
    </ul>`;


    //$(".people").html("PEOPLE: " + id + content);
    $(".people").show();

}

function initSliderImages() {
    $(".my_movie_images").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true
    });
}

function initSliderCast() {
    $(".cast_slider").slick({
        slidesToShow: 6,
        slidesToScroll: 1
    });
}

$(window).on("load", function () {

    $("#search").keyup(
        function () {
            let search = $(this).val();
            console.log("TEXT: " + search);

            let getSearch = $.ajax({
                url: "services/search.php",
                type: "POST",
                data: {
                    search_text: search
                },
                dataType: "json"
            });


            getSearch.done(
                function (data) {


                    let content = "";

                    $.each(data, function (i, item) {

                        let id = "";
                        let name = "";
                        let image_id = "";
                        let image_name = "";
                        let class_name = "";

                        if (item.type == 2) {
                            // is a person
                            id = item.people_id;
                            name = item.name;
                            image_id = item.cover_id;
                            image_name = item.cover_name;
                            class_name = "people";
                        } else {
                            // is a movie
                            id = item.movie_id;
                            name = item.movie_name;
                            image_id = item.cover_id;
                            image_name = item.cover_name;
                            class_name = "movie";
                        }

                        //console.log(lastName);
                        content += `<div class="style_class ${class_name}" data-id="${id}">
                        <img src="https://dca.durhamcollege.ca/~madmovies/uploads2/uploads/${image_id}/${image_name}" alt="${name}"> ${name}
                        </div>`;

                    });

                    // output to a div
                    $(".search_results").html(content);


                }
            );

            getSearch.fail(function (jqXHR, textStatus) {
                alert("Something went Wrong! (getSearch)" +
                    textStatus);
            });
        }
    );


    initSliderImages();
    initSliderCast();

    $(".logo").click(
        function () {
            location.href = "#/splash/";
        }
    );

    $(document).on("click", "body .movie", function () {
        let movie_id = $(this).attr("data-id");
        location.href = `#/movie/${movie_id}`;
    });

    $(".people").click(
        function () {
            location.href = "#/people/1223";
        }
    );


    // SAMMY ROUTING
    // Controller in MVC

    var app = $.sammy(function () {

        this.get('#/splash/', function () {
            getSplash();
        });

        this.get('#/movie/:id', function () {
            let movie_id = this.params['id'];
            getMovie(movie_id);
        });

        this.get('#/people/:id', function () {
            let person_id = this.params['id'];
            getPerson(person_id);
        });

    });

    // default when page first loads
    $(function () {
        app.run('#/splash/');
    });
});
