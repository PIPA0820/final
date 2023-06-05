$(function () {
    let round = 0;
    let currentQuiz = null;
     $("#startButton").on("click",function(){
        $('body').css('background-image', 'url("3.jpg")' );
         // console.log("Hello");
         if(currentQuiz == null){
             currentQuiz = 0;
             $("#question").text(questions[0].question);
             $("#options").empty();
             questions[0].answers.forEach(function(element, index, array){
                 $("#options").append(
                    ` <input name='options' class="input${index}" type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                 );
             });
             $("#startButton").attr("value","下一題");
             
         }else{
             $.each($(":radio"),function(i, val){
                 // console.log(i + " : " + val.checked);
                 if(val.checked){
                     if(isNaN(questions[currentQuiz].answers[i][1])){
                        score.forEach(function(element,index,array){
                            score[index] += optionScore[round*4+i][index];
                        });   
                        var maxValue = Math.max.apply(null, score);
                        var maxIndex = $.inArray(maxValue, score);

                        console.log("最大值: " + maxValue);
                        console.log("最大值索引: " + maxIndex);
                        let image = 'url('+finalAnswers[maxIndex]+')'
                        $('body').css('background-image', image );
                         //A,B,C,D
                        $("#question").empty();
                        $("#options").empty();
                        //$("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $('#startButton').hide();
                     }else{
                         currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                         score.forEach(function(element,index,array){
                            score[index] += optionScore[round*4+i][index];
                        });                        
                         $("#question").text(questions[currentQuiz].question);
                         $("#options").empty();
                         questions[currentQuiz].answers.forEach(function (element, index, array) {
                            $("#options").append(
                                ` <input name='options' class="input${index}" type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                             );
                         });
                         round++;
                     }
                     return false;
                 }
             });
         }
     });
 });