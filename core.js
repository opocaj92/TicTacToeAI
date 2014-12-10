var field=new Array(9);
for(var i=0;i<9;i++)
		field[i]="";

function drawMove(caller) {
	var div=document.getElementById(caller);
	if(div.innerHTML=="") {
		div.innerHTML="X";
		field[parseInt(caller.substring(1,2))]="X";
		if(checkField(field)==-10)
			showResult("You Win!");
		else {
			var c=minimax(field,true);
			if(c[1]!=-1) {
				document.getElementById("e"+c[1]).innerHTML="O";
				field[c[1]]="O";
				if(checkField(field)==10)
					showResult("You Lose!");
			} else
				showResult("Draft");
		}
	}
}

function minimax(field,turn) {
	var info=[Infinity,-1];
	var r=checkField(field);
	if(r!=Infinity)
		info[0]=r;
	else {
		if(turn) {
			info[0]=-Infinity;
			for(var i=0;i<9;i++) {
				if(field[i]=="") {
					field[i]="O";
					var c=minimax(field,!turn);
					if(c[0]>info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
					field[i]="";
				}
			}
		} else {
			for(var i=0;i<9;i++) {
				if(field[i]=="") {
					field[i]="X";
					var c=minimax(field,!turn);
					if(c[0]<info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
					field[i]="";
				}
			}
		}
	}
	return info;
}

function checkField(field) {
	for(var i=0;i<3;i++)
		if(field[3*i]==field[3*i+1] && field[3*i]==field[3*i+2])
			if(field[3*i]=="O")
				return 10;
			else if(field[3*i]=="X")
				return -10;
	for(var i=0;i<3;i++)
		if(field[i]==field[i+3] && field[i]==field[i+6])
			if(field[i]=="O")
				return 10;
			else if(field[i]=="X")
				return -10;
	if(field[0]==field[4] && field[0]==field[8])
		if(field[0]=="O")
			return 10;
		else if(field[0]=="X")
			return -10;
	if(field[2]==field[4] && field[2]==field[6])
		if(field[2]=="O")
			return 10;
		else if(field[2]=="X")
			return -10;
	for(var i=0;i<9;i++)
		if(field[i]=="")
			return Infinity;
	return 0;
}

function showResult(text) {
	document.getElementById("back").style.display="block";
	var div=document.getElementById("result");
	div.innerHTML=text;
	div.style.display="block";
}

function restartGame() {
	location.reload();
}