function addElementClickById(id,someThing)
{
	var element = document.getElementById(id);
	if(element!=null)
	{
		element.addEventListener("click",someThing);
	}
}
function getScriptSource(id)
{
	return document.getElementById(id).textContent;
}
function createShader(type,source)
{
	var shaderType=type=="v"?gl.VERTEX_SHADER:gl.FRAGMENT_SHADER;
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	return shader;
}
function addShader(gl,vShaderSource,fShaderSource)
{
	var vShader =createShader('v',vShaderSource);
	var fShader =createShader('f',fShaderSource);
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vShader);
	gl.attachShader(shaderProgram,fShader);
	gl.linkProgram(shaderProgram);
	return shaderProgram;
}
function clearBackground(gl,r=0,g=0,b=0)
{
	gl.clearColor(r,g,b,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
}
function render(clean,gl,shaderProgram,draw,time,r=0,g=0,b=0,start)
{
	if(clean)
	{
		clearBackground(gl,r,g,b);
		gl.clear(gl.DEPTH_BUFFER_BIT);
	}
	gl.useProgram(shaderProgram);
	if(start)start();
	draw(gl,shaderProgram,time);
}
function setProgramAttributenf(n,gl,program,attribute,x=0.0,y=0.0,z=0.0,w=1)
{
	var position = gl.getAttribLocation(program,attribute);
	if(n==1)
	{
		gl.vertexAttrib1f(position,x);
	}
	else if(n==2)
	{
		gl.vertexAttrib2f(position,x,y);
	}
	else if(n==3)
	{
		gl.vertexAttrib3f(position,x,y,z);
	}
	else
	{
		gl.vertexAttrib4f(position,x,y,z,w);
	}
	
}
function setProgramUniformnf(n,gl,program,attribute,x=0.0,y=0.0,z=0.0,w=1)
{
	var position = gl.getUniformLocation(program,attribute);
	if(n==1)
	{
		gl.uniform1f(position,x);
	}
	else if(n==2)
	{
		gl.uniform2f(position,x,y);
	}
	else if(n==3)
	{
		gl.uniform3f(position,x,y,z);
	}
	else
	{
		gl.uniform4f(position,x,y,z,w);
	}
	
}
function setProgramUniform4Mat(gl,program,attribute,mat)
{
	var position = gl.getUniformLocation(program,attribute);
	gl.uniformMatrix4fv(position,false,mat);
}
function createArrayBuffer(gl,array,program,attribute,size,trip=0)
{
	var position=null;
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,array,gl.STATIC_DRAW);
	if( typeof attribute  ==="string")
	{
		position= gl.getAttribLocation(program,attribute);
		gl.vertexAttribPointer(position,size,gl.FLOAT,false,trip,0);
		gl.enableVertexAttribArray(position);
	}
	else
	{
		var count=0;
		for(var i in attribute)
		{
			position = gl.getAttribLocation(program,i);
			gl.vertexAttribPointer(position,size[count],gl.FLOAT,false,trip,attribute[i]);
			gl.enableVertexAttribArray(position);
			++count;
		}
	}
}
function setIndexsBuffer(gl,array,program)
{
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,array,gl.STATIC_DRAW);
}
function animation(dosome)
{
	var time=new Date();
	function tick()
	{
		
		var now=new Date();
		dosome(now-time);
		time=now;
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
}
function loadImage(url,action)
{
	var image = new Image();
	image.onload=action;
	image.src=url;
}
function createTexture(gl,program,attribute,num,image)
{
	var texture = gl.createTexture();
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
	gl.activeTexture(gl['TEXTURE'+num]);
	gl.bindTexture(gl.TEXTURE_2D,texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
	var loaction = gl.getUniformLocation(program,attribute);
	gl.uniform1i(loaction,num);		
}