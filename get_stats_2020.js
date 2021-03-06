
    var results;

    var p_email = document.getElementById("p_email").value;

    var p_email = p_email.replace(/[&\/\\#,+()$~%:*?<>{}]/g, '');

    stats_form = {
                        "p_email" : p_email
                   };

    stats_data = JSON.stringify(stats_form);

    $.ajax({
        url: "api/get_stats_2020.php",
        type : "POST",
        contentType : 'application/json',
        async: false,
        data : stats_data,
        success : function(result) {

            results = JSON.parse(result);
            if(results.error == "true") {
                $('#results_error').html(results.message);
                search_button("SEARCH");
                return;
            } else {
            }
        },

        // show error message to user
        error: function(){
            $('#results_error').html("Error, nådde ikke API... " + p_email);
            return;
        }
    });

    if(results.error == "true") {
        $('#results_error').html(results.message);
        exit;
    }

    var search_box = document.getElementById("search_input");
    search_box.style.display = "none";

    var text = "";

    //INTRODUCTION
    text += "<div class='boks' style='width: 100%; padding-bottom: 25em; padding-top: 25em; height:auto; background-color:#add8e6;'>";
    text += "<h2 style='font-size:3em;'>Hey there, " + results.name + "!</h2><h2>";
    text += "<br><br>2020 kinda sucked, but hopefully you watched some cool stuff...</p>"
    text += "</div>";

    //MOVIES
    text += "<div class='boks' style='height: auto !important; width: 100%; padding-bottom: 25em; padding-top: 25em; height:10em; background-color:#f7efd2;'>";
    text += "<h2>Let's look at some movies.";
    text += "<br><br><br>You watched " + results.top_movies.length + " movies. That's a lot of movies!</h2><br>(or not, I am pre-programmed to say that)"
    text += "<br><br>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3'>";
    text += "<div class='stats'>";
    text += "<h4>Your top 10 movies in 2020</h4>";
    for(i = 0; (i < results.top_movies.length && i < 10); i++) {
        text += "<div class='item'>";
        text += "<div class='number'>";
        text += i+1 + ". ";
        text += "</div>";
        text += "<div class='movie_name'>";
        text += results.top_movies[i].title;
        var movie_hour = time_hours(results.top_movies[i].duration)
        text += " - " + movie_hour[0] + " hours, " + movie_hour[1] + " minutes";
        text += "</div>";
        text += "</div>";
    }
    text += "</div>";
    text += "</div>";
    text += "</div>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3' style='padding:2.5em;>";
    text += "<div class='stats'>";
    var str = JSON.stringify(results.movie_percent_average);
    var percent = str.split('.');
    text += "<h4>Your average movie finishing percentage in 2020 was " + percent[0] + "%</h4>";
    text += "<br><br>You're not watching the credits like a nerd, are you?";
    text += "</div>";

    text += "<div class='status' id='list3' style='margin-top:2.5em; padding:2.5em;>";
    text += "<div class='stats'>";
    text += "Your longest movie pause was watching <br><br><h4>" + results.movie_most_paused.title + ".</h4>";
    var str = JSON.stringify(results.movie_most_paused.paused_counter / 60);
    var minutes = str.split('.');
    text += "<br>It was paused for " + minutes[0] + " minutes...";
    text += "</div>";
    text += "</div>";
    text += "</div>";

    //SHOWS
    text += "<div class='boks' style='height: auto !important; width: 100%; padding-bottom: 25em; padding-top: 25em; height:10em; background-color:#eed7a1;'>";
    text += "<h2>Now, let's have a look at some shows!";
    text += "<br><br><br>You watched " + results.top_shows.length + " different shows.</h2><br>(No, watching The Office twice in a year doesn't count as two shows)"
    text += "<br><br>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3'>";
    text += "<div class='stats'>";
    text += "<h4>Your top 10 shows in 2020</h4>";
    for(i = 0; (i < results.top_shows.length && i < 10); i++) {
        text += "<div class='item'>";
        text += "<div class='number'>";
        text += i+1 + ". ";
        text += "</div>";
        text += "<div class='movie_name'>";
        text += results.top_shows[i].title;
        var show_hour = time_hours(results.top_shows[i].duration)
        text += " - " + show_hour[0] + " hours, " + show_hour[1] + " minutes";
        text += "</div>";
        text += "</div>";
    }
    text += "</div>";
    text += "</div>";
    text += "</div>";
	
	if(results.top_shows.length > 0) {
    text += "<div class='boks2'>";
    text += "<div class='status' id='list3' style='padding:2.5em;>";
    text += "<div class='stats'>";
    var str = JSON.stringify(results.movie_percent_average);
    var percent = str.split('.');
    text += "<h4>Your top show was " + results.top_shows[0].title + "</h4><br>";
    var buddy_error = JSON.stringify(results.show_buddy.error);
    if(buddy_error == "true") {
        text += "<br>That means you're a hipster, because you're the only viewer of that show in 2020 😎";
    } else {
		text += "And you're not alone! Your " + results.top_shows[0].title + "-buddy is ";
		text += "<b>" + results.show_buddy.user + "!</b><br><br>";
		var combined = parseInt(results.show_buddy.duration) + parseInt(results.top_shows[0].duration);
		var combined_2 = time_hours(combined);
		text += "Your combined efforts resulted in <b>" + combined_2[0] + " hours and " + combined_2[1] + " minutes</b> of " + results.top_shows[0].title + "!</b><br><br>😎";
    }
    text += "</div>";
    text += "</div>";
	}
    text += "</div>";
	

    //TOP USERS
    text += "<div class='boks' style='height: auto !important; width: 100%; padding-bottom: 25em; padding-top: 25em; height:10em; background-color:	#f7efd2;'>";
    text += "<h2>Finally, let's look at the top users, movies and shows in 2020!";
    text += "<br><br><br><br>It's okay to feel shame if you are on the list.</h2>(or missing from it...)"
    text += "<br><br>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3'>";
    text += "<div class='stats'>";
        text += "<h4>Top users from the past year</h4>";
        for(i = 0; i < 10; i++) {
            text += "<div class='item'>";
            text += "<div class='number'>";
            text += i+1 + ". ";
            text += "</div>";
            text += "<div class='name'>";
            text += results.top_users[i];
            text += "</div>";
            text += "</div>";
        }
    text += "</div>";
    text += "</div>";
    text += "</div>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3'>";
    text += "<div class='stats'>";
    text += "<h4>Top movies from the past year</h4>";
    for(i = 0; i < 10; i++) {
        text += "<div class='item'>";
        text += "<div class='number'>";
        text += i+1 + ". ";
        text += "</div>";
        text += "<div class='movie_name'><b>";
        text += results.top_10_movies[i].title;
        var movie_hour = time_hours(results.top_10_movies[i].duration)
        text += "</b><br>" + movie_hour[0] + " hours and " + movie_hour[1] + " minutes<br>" + results.top_10_movies[i].plays + " plays";
        text += "</div>";
        text += "</div>";
    }
    text += "</div>";
    text += "</div>";
    text += "</div>";

    text += "<div class='boks2'>";
    text += "<div class='status' id='list3'>";
    text += "<div class='stats'>";
    text += "<h4>Top shows from the past year</h4>";
    for(i = 0; i < 10; i++) {
        text += "<div class='item'>";
        text += "<div class='number'>";
        text += i+1 + ". ";
        text += "</div>";
        text += "<div class='movie_name'><b>";
        text += results.top_10_shows[i].title;
        var show_hour = time_hours(results.top_10_shows[i].duration)
        text += "</b><br>" + show_hour[0] + " hours and " + show_hour[1] + " minutes<br>" + results.top_10_shows[i].plays + " plays";
        text += "</div>";
        text += "</div>";
    }
    text += "</div>";
    text += "</div>";
    text += "</div>";

    text += "</div>";


    //SHOWS
    text += "<div class='boks' style='height: auto !important; width: 100%; padding-bottom: 25em; padding-top: 25em; height:10em; background-color:#cd8b62;'>";
    text += "<h2>Hope you are staying safe!<br><br><br><br>Goodybye.</h2>";
    text += "</div>";

    $('#search_results').html(text);

    search_button("SEARCH");