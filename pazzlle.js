window.onload = function() {
   
    function init() {
        var arr = ['']
        for(i = 0; i < 8; i++) {
            arr.push((i + 1).toString());
        }
        shuffle(arr);
        if(!isOK(arr.slice(0, arr.length))) { 
            
            init();
        }else { 
            drawing(arr);
        }
    }
    function shuffle(arr) {
        var i = arr.length;
        while(i) {
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
       
        var blank_index = arr.indexOf('');
        dist_vertical = Math.floor(((arr.length - 1) - blank_index) / Math.sqrt(arr.length));
        dist_horizontal = ((arr.length - 1) - blank_index) % Math.sqrt(arr.length);
        var dist = dist_vertical + dist_horizontal;
        answer = [];
        for(i = 0; i < 8; i++) {
            answer.push((i + 1).toString());
        }
        answer.push('');
        var count = 0;
        for (var i = 0; i < answer.length; i++) {
            for (var j = i + 1; j < answer.length; j++) {
                if(i + 1 == arr[j]) { 
                    swap(i, j, arr);
                    count++;
                }
            }
            if(arr.toString() === answer.toString()) {
                break;
            }
        }

        if(count % 2 === dist % 2) { 
            return true;
        }else { 
            return false;
        }
    }

 
    function drawing(arr) {
        var $jsShowPanel = document.getElementById('js-show-panel');
        while($jsShowPanel.firstChild) {
            $jsShowPanel.removeChild($jsShowPanel.firstChild);
        }

        fragment = document.createDocumentFragment();

        arr.forEach(function(element) {   
            var tileWrapper = document.createElement('div');
            tileWrapper.className = 'tile-wrapper';

            var tile = document.createElement('div');
            tile.className = element != '' ? 'tile tile-' + element : 'tile tile-none';
            tile.textContent = element;

            tileWrapper.appendChild(tile);
            fragment.appendChild(tileWrapper);
        });
      
        $jsShowPanel.appendChild(fragment);

        addEventListenerClick(arr);
    }
    function addEventListenerClick(arr) {
        $tile = document.querySelectorAll('.tile');
        $tile.forEach(function(elem) {
            elem.addEventListener('click', function() {
                var i =  arr.indexOf(this.textContent);
                var j;
                if(i <= 5 && arr[i + 3] == '') {
                    j = i + 3;
                }
                else if(i >= 3 && arr[i - 3] == '') {
                    j = i - 3;
                }
                
                else if(i % 3 != 2 && arr[i + 1] == '') { 
                    j = i + 1;
                }else if(i % 3 != 0 && arr[i - 1] == '') {
                    j = i - 1;
                }
                else {
                    return;
                }
                swap(i, j, arr);
                drawing(arr);
            });
        });
    }
    init();
    document.getElementById('js-reset-puzzle').addEventListener('click', function() {
        init();
    });
}
