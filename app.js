'use strict';

let paste = document.getElementById('paste');
let tab = document.createElement('table');
tab.id = 'grid';
let grid = document.getElementById('grid');

class Grid {
    constructor() {
        this.wraper = paste.appendChild(tab);
        this.columns = ['Programming language', 'Jan 2017', 'Jan 2018', 'Ratings,%', 'Change,%'];
        this.rows = ['Java 1 1 14.215 -3.06', 'C 2 2 11.037 +1.69', 'C++ 3 3 5.603 -0.70',
            'Python 4 5 4.678 +1.21', 'C# 5 4 3.754 -0.29', 'JavaScript 6 7 3.465 +0.62'];
    }

    bildTablHead() {
        tab.border = 1;
        tab.align = 'center';
        let thead = document.createElement('tHead'),
            tr = document.createElement('tr');

        for (let i = 0; i < this.columns.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = this.columns[i] + '&nbsp; ' + '\u2193';
            tr.appendChild(th);
            th.setAttribute('data-type', 'number');
        }
        tr.firstChild.setAttribute('data-type', 'string');
        tab.appendChild(thead);
        thead.appendChild(tr);
    }

    bildTablAll() {
        let tbody = document.createElement('tBody');
        let trBody = document.createElement('tr');
        let rowsLength = this.rows.length;
        for (let j = 0; j < rowsLength; j++) {
            let result = this.rows.shift().split(' '),
                rowInfo = tbody.insertRow(-1);
                for (let k = 0; k < result.length; k++) {
                let playInfo1 = rowInfo.insertCell(-1);
                playInfo1.width = "290";
                playInfo1.align = "center";
                playInfo1.innerHTML = result[k] ;
            }
        }
        tab.appendChild(tbody);
    }

     getLine() {
        let gridTable = document.getElementById('grid');
        let tBody = gridTable.lastChild;
        let modal = document.getElementById('modal');
        let plus = document.getElementById('plus');
        let minus = document.getElementById('minus');
        let close = document.getElementById('close');


         tBody.addEventListener('dblclick',abc);

             function abc(event) {
            if (event.target.tagName !== 'TD') return;
                 let trTarget = event.target.parentElement;
                 let TRnumber = Number(trTarget.rowIndex);

                 modal.style.display = 'block';
                 modal.style.left = event.clientX+'px';
                 modal.style.top = event.clientY+'px';

         plus.onclick = function () {
              let rowInfo = gridTable.insertRow(TRnumber + 1);

                 let playInfo1;
                     for (let k = 0; k < 5; k++) {
                         let playInfo1 = rowInfo.insertCell(-1);
                         playInfo1.width = "290";
                         playInfo1.height = "22";
                         playInfo1.align = "center";
                         playInfo1.innerHTML = '' ;
                     }
                     return modal.style.display = 'none';
     };
         close.onclick = function () {
             modal.style.display = 'none';
         };
         minus.onclick = function (event) {
             gridTable.deleteRow(TRnumber);
             return modal.style.display = 'none';
         }
     }
    }
 correctTD () {
    let grid = document.getElementById('grid');
     let tBody = grid.lastChild;
    let editingTd;
     tBody.addEventListener('click', xxx) ;

         function xxx (event) {
        let target = event.target;
        while (target != grid) {
            if (target.className == 'edit-cancel') {
                finishTdEdit(editingTd.elem, false);
                return;
            }
            if (target.className == 'edit-ok') {
                finishTdEdit(editingTd.elem, true);
                return;
            }

            if (target.nodeName == 'TD') {
                if (editingTd) return;
                makeTdEditable(target);
                return;
            }
            target = target.parentNode;
        }
    }
    function makeTdEditable(td) {
        editingTd = {
            elem: td,
            data: td.innerHTML
        };
        td.classList.add('edit-td');
        let textArea = document.createElement('textarea');
        textArea.style.width = td.clientWidth + 'px';
        textArea.style.height = td.clientHeight + 'px';
        textArea.className = 'edit-area';

        textArea.value = td.innerHTML;
        td.innerHTML = '';
        td.appendChild(textArea);
        textArea.focus();
        td.insertAdjacentHTML("beforeEnd",
            '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
        );
    }
    function finishTdEdit(td, isOk) {
        if (isOk) {
            td.innerHTML = td.firstChild.value;
        } else {
            td.innerHTML = editingTd.data;
        }
        td.classList.remove('edit-td');
        editingTd = null;
    }
}

        sortTab() {
        let up = document.getElementById('up'),
            down = document.getElementById('down');
        let grid = document.getElementById('grid');

        grid.onclick = function (e) {
            if (e.target.tagName !== 'TH') return;
            sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
        };

        function sortGrid(colNum, type) {
            let tTBbody = grid.getElementsByTagName('tbody')[0];
            let rowsArray = [].slice.call(tTBbody.rows);
            let compare;

            switch (type) {
                case 'number':
                    compare = function (rowA, rowB) {
                        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
                    };
                    break;
                case 'string':
                    compare = function (rowA, rowB) {
                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML;
                    };
                    break;
            }

            rowsArray.sort(compare);
            grid.removeChild(tTBbody);
            for (let n = 0; n < rowsArray.length; n++) {
                tTBbody.appendChild(rowsArray[n]);
            }
            grid.appendChild(tTBbody);
        }
    }
}

let home = new Grid();

document.addEventListener("DOMContentLoaded", function () {
    home.bildTablHead();
    home.bildTablAll();
    home.sortTab();
    home.getLine();
   home.correctTD();
});