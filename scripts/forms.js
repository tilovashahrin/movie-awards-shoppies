//api key: http://www.omdbapi.com/?apikey=7aefcf4e
$(document).ready(()=> {
    $('#searchbtn').on('click', (e)=>{
        let searchtxt = $('#searchText').val();
        apiCall(searchtxt);
        e.preventDefault();
    });

    $('#nominatebtn').on('click', (e)=>{
        console.log("line 10 works");
    })

})

    function apiCall(searchtxt){
        axios.get('http://www.omdbapi.com/?apikey=7aefcf4e&s='+searchtxt).then((response) => {
                let mov_list = response.data.Search;
                console.log(mov_list);
                let output = '';
                $.each(mov_list, (index, movies)=> {
                    output += ` 
                    <h5 id="movie"> ${movies.Title} (${movies.Year})</h5> 
                    <button id="nominatebtn" onclick="nominate('${movies.Title}', '${movies.Year}')">Nominate</button>
                    `;
                })
                $('#movie_details').append(output);

            })
        .catch((err) => {
            console.log(err);
        })
    };
    
    function nominate(title, year){
        let output = `<h5 id="movie_nom"> `+title+ ` (`+year+`)</h5> 
        <button id="removebtn" onclick="remove()">Remove</button>`;
        $('#nominations').append(output);
    }

    function remove(){
        
    }