$(document).on("click", "#movie-search-button", function(event) {
	event.preventDefault();

	if ($("#movie-title").val() === "") {
		return false;
	}

	$.ajax({
		type: "GET",
		url: "http://omdbapi.com?s=" + encodeURIComponent($("#movie-title").val()),
		success: function(data) {
			var movies = JSON.parse(data).Search;

			movies.forEach(function(movie) {
				$.ajax({
					type: "GET",
					url: "http://omdbapi.com?i=" + movie.imdbID,
					success: function(info) {
						$("#search-input-box").fadeOut(function() {
							var movieData = JSON.parse(info);

							var source = $("#movie-card-template").html();

							var template = Handlebars.compile(source);

							var html = template(movieData);

							$("#movie-card-container").append(html);
						});
					}
				});
			});
		}
	});
});