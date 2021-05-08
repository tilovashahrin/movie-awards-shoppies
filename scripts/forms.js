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
        axios.get('http://www.omdbapi.com/?apikey=7aefcf4e&s='+searchtxt).then((response) => {
                let mov_list = response.data.Search;
                let output = '';
                $.each(mov_list, (index, movies)=> {
                    output += ` 
                    <h5 id="movie"> ${movies.Title} (${movies.Year})</h5> 
                    <button type="button" id="nominatebtn" onclick="nominate('${movies.Title}', '${movies.Year}')">Nominate</button>
                    `;
                })
                $('#movie_details').append(output);

            })
        .catch((err) => {
            console.log(err);
        })
    };
    
    function nominate(title, year){
        
        var $selected = $('#nominations');
        var $kids = $selected.children();
        if ($kids.length >= 5){
            //$kids.last().remove();
            alert("Can only have 5 nominations");
        }else{
            let output = `
                <div id="nom_result">
                <h5 id="movie_nom"> `+title+ ` (`+year+`)</h5> 
                <button type="button" id="removebtn" onclick="remove()">Remove</button>
                </div>`;
            $('#nominations').append(output);
        }
        
    }

    function remove(){
        var div = document.getElementById('nom_result');
        div.parentNode.removeChild(div);
    }