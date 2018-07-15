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
	gl.useProgram(shaderProgram);
}
