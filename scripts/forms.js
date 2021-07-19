//api key: http://www.omdbapi.com/?apikey=7aefcf4e
$(document).ready(()=> {
    $('#searchbtn').on('click', (e)=>{
        let searchtxt = $('#searchText').val();
        apiCall(searchtxt);
        e.preventDefault();
    });

    $("#removebtn").on('click', (e) =>{
        e.preventDefault();
    });

})

    function apiCall(searchtxt){
        var $selected = $('#movie_details');
        var $kids = $selected.children();
        $kids.remove();

        // var $selected2 = $('#results-title');
        // var $kids2 = $selected2.children();
        // $kids2.remove();
        axios.get('http://www.omdbapi.com/?apikey=7aefcf4e&s='+searchtxt).then((response) => {
                let mov_list = response.data.Search;
                let output = '';
                $.each(mov_list, (index, movies)=> {
                    output += ` 
                    <h5 id="movie"> ${movies.Title} (${movies.Year})</h5> 
                    <button type="button" id="nominatebtn${movies.Title}" class="nominatebtn" onclick="nominate('${movies.Title}', '${movies.Year}')">Nominate</button>
                    `;
                })
                //$('#results-title').append('Results for "'+ searchtxt +'"');
                $('#movie_details').append(output);

            })
        .catch((err) => {
            console.log(err);
        })
    };
    
    function nominate(title, year){    
        var div = document.getElementById('nominatebtn' + title);
        div.parentNode.removeChild(div);

        var $selected = $('#nominations');
        var $kids = $selected.children();
        if ($kids.length >= 5){         
            alert("Can only have 5 nominations");
        }else{
            let output = `
                <div id="nom_result">
                <h5 id="movie_nom"> `+ title + ` (`+ year +`)</h5> 
                <button type="button" id="removebtn" class="removebtn" onclick="remove()">Remove</button>
                </div>
                `;
            $('#nominations').append(output);
        }
        
    }

    function remove(){
        var div = document.getElementById('nom_result');
        div.parentNode.removeChild(div);
    }
