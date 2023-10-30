let element = document.getElementById('mainbox')
element.classList.remove('animate')

// setTimeout(function() {
//     element.classlist.add('animate')
// },5000)

function rotateFunction(){
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";
    setTimeout(function() {
      // element.classlist.add('animate')
      alert('enjoy your meal :p')
      window.location.href='http://127.0.0.1:5500/public/home.html'
  },5000)
  }

  function spinWheel() {
    document.body.style.zoom = '120%'
    console.log('my brain hurts please work!')
    axios.get("http://localhost:4004/wheel")
        .then(res => {
            document.getElementById('box').innerHTML = `
            <div class="box1">
                <span class="span1"><b>${res.data[0]}</b></span>
                <span class="span2"><b>${res.data[1]}</b></span>
                <span class="span3"><b>${res.data[2]}</b></span>
                <span class="span4"><b>${res.data[3]}</b></span>
              </div>
              <div class="box2">
                <span class="span1"><b>${res.data[4]}</b></span>
                <span class="span2"><b>${res.data[5]}</b></span>
                <span class="span3"><b>${res.data[6]}</b></span>
                <span class="span4"><b>${res.data[7]}</b></span>
              </div>
            `
            
        }).catch(err => {
            console.log(err.response.data)
            alert(':c')
            window.location.href='http://127.0.0.1:5500/public/home.html'
        })
  }

  spinWheel()