var num = 0;
var score = [0,0,0,0,0];

$(document).ready( function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var javaobj = JSON.parse(xhttp.response);
			loadPageData(javaobj);
		}
	};
	xhttp.open("GET","quiz.json",true);
	xhttp.send();
});

function loadPageData(data){
	$("h1").html(data.title);
	$("#buttons").html(
		"<div class='col'><button type='button' class='btn btn-light btn-lg' id='startQuiz'>Take the Quiz</button></div>"
	);
	
	$("#startQuiz").click( function(){
		$("#image").html("<p><img src='_images/" + data.questions[num].image + "'></p>");
		$("#topic").html(data.questions[num].topic);
		$("#question").html(data.questions[num].question);
		
		$("#buttons").html(
			"<div class='col-xs-6'><button type='button' class='btn btn-light btn-lg'>Yes</button></div>" +
			"<div class='col-xs-6'><button type='button' class='btn btn-light btn-lg' value='true'>No</button></div>" 
		)
		
		$("button").click( function(){
			if(num == 8){
				
				//Which index inside score has the highest value?
				var index = score.indexOf(Math.max(...score));
				//score = score_highestValuedIndex (ensure outcome in proper order in json)
				
				$("#image").html("<img src='_images/" + data.outcomes[index].image + "'>");
				$("#question").html(data.outcomes[index].title);
				$("#buttons").html("<p>" + data.outcomes[index].description + "</p>");
				$("#verse").html(data.outcomes[index].verse);
				$("#help").html("If you need someone to talk to, feel free to email our life counselor at: <a href='mailto:" + data.resourseList[0].email + "'>" + data.resourseList[0].email + "</a>");
			}else{
				num ++;
				if($(this).val() == 'true'){
					for(var x = 0; x < 5; x++){
						score[x] += data.questions[num].weight[x];
					}					
				}
				
				$("#image").html("<p><img src='_images/" + data.questions[num].image + "'></p>");
				$("#topic").html(data.questions[num].topic);
				$("#question").html(data.questions[num].question);
			}
		});		
	});
}