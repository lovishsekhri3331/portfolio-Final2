//main.js
// routing for MMDB

function getSplash() {
    $(".hideAll").hide();
    // call movie XHR
    // Populate splash div
    $(".splash").show();
}

function getMovie(id) {
    $(".hideAll").hide();
    // call movie XHR
    // Populate movie div

    let content = `<br>
    <ul>
        <li><a href="#/movie/133">MOVIE 133</a></li>
        <li><a href="#/movie/144">MOVIE 144</a></li>
        <li><a href="#/movie/155">MOVIE 155</a></li>
    </ul>

    <br>

    <ul>
        <li><a href="#/people/223">person 223</a></li>
        <li><a href="#/people/14245">person 14245</a></li>
        <li><a href="#/people/64232">person 64232</a></li>
    </ul>   `;

    //$(".movie").html("MOVIE: " + id + content);
    $(".movies").show();
}

function getPerson(id) {
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

$(window).on("load", function () {


    $(".logo").click(
        function () {
            location.href = "#/splash/";
        }
    );

    $(".movie").click(
        function () {
            location.href = "#/movie/123";
        }
    );

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
        app.run('#/people/123');
    });
});
