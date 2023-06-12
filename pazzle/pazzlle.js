window.onload = function() {
    function init() {
      var arr = [];
      for (i = 0; i < 8; i++) {
        arr.push((i + 1).toString());
      }
      arr.push('');
      // shuffle(arr);
      drawing(arr);
    }
  
    function shuffle(arr) {
      var i = arr.length;
      while (i) {
        var j = Math.floor(Math.random() * i--);
        swap(i, j, arr);
      }
    }
  
    function swap(i, j, arr) {
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  
    function isOK(arr) {
      var answer = [];
      for (i = 0; i < 8; i++) {
        answer.push((i + 1).toString());
      }
      answer.push('');
  
      return arr.toString() === answer.toString();
    }
  
    function drawing(arr) {
      var $jsShowPanel = document.getElementById('js-show-panel');
      while ($jsShowPanel.firstChild) {
        $jsShowPanel.removeChild($jsShowPanel.firstChild);
      }
  
      var fragment = document.createDocumentFragment();
  
      arr.forEach(function(element) {
        var tileWrapper = document.createElement('div');
        tileWrapper.className = 'tile-wrapper';
  
        var tile = document.createElement('div');
        tile.className = element !== '' ? 'tile tile-' + element : 'tile tile-none';
        tile.textContent = element;
  
        tileWrapper.appendChild(tile);
        fragment.appendChild(tileWrapper);
      });
  
      $jsShowPanel.appendChild(fragment);
  
      addEventListenerClick(arr);
    }
  
    function addEventListenerClick(arr) {

      const answerList = [1,2,3,4,5,6,7,8,9,,]

      var $tile = document.querySelectorAll('.tile');
      $tile.forEach(function(elem) {
        elem.addEventListener('click', function() {
          var i = arr.indexOf(this.textContent);
          var j;

          console.log("i: " + i + " j: " + j);
          console.log("arr[]" + arr);

          if (i <= 5 && arr[i + 3] === '') {
            j = i + 3;
          } else if (i >= 3 && arr[i - 3] === '') {
            j = i - 3;
          } else if (i % 3 !== 2 & arr[i + 1] === '') {
            j = i + 1;
          } else if (i % 3 !== 0 && arr[i - 1] === '') {
            j = i - 1;
          } else {
            return;
          }

          swap(i, j, arr);
          drawing(arr);

          if (isOK(arr)) {
            // クリア処理
            alert('パズルをクリアしました！');
          }
       
        });
      });
    }
  
    init();
    document.getElementById('js-reset-puzzle').addEventListener('click', function() {
      init();
    });
  };
