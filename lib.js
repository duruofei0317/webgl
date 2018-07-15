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
function render(clean,gl,shaderProgram,draw,r=0,g=0,b=0)
{
	if(clean)
	{
		clearBackground(gl,r,g,b);
	}
	gl.useProgram(shaderProgram);
	draw(gl,shaderProgram);
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
