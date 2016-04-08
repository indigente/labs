<?php
//	$nome=$_POST["nome"];
//    $edade=$_POST["edade"];
//  	$escola=$_POST["escola"];
//  	$nascimento=$_POST["nascimento"];
//  	$sexo=$_POST["sexo"];
  	$trial1_3O=$_POST["trial1_3O"];
  	$trial1_3L=$_POST["trial1_3L"];
  	$trial1_3OL=$_POST["trial1_3OL"];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Inserir Jogador</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
	<header>
		<img src="img/indigente.png" alt="Logo Indigente">
		<h1>Inserir Jogador</h1>
	</header>
    
	<?php 
		$conn = mysqli_connect("localhost","root","root","neandertaa");


		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		mysqli_query($conn,"SET NAMES 'utf8'");
		echo "$nome<br>";
    	echo "$edade<br>";
  		echo "$escola<br>";
  		echo "$nascimento<br>";
  		echo "$sexo<br>";
  		echo "$trial1_3O<br>";
  		echo "$trial1_3L<br>";
  		echo "$trial1_3OL<br>";
		
//		$sql = "INSERT INTO neandertaa (nome,edade,escola,nascimento,sexo,trial1_3O,trial1_3L,trial1_3OL)
//				VALUES ('$nome',$edade,'$escola','$nascimento','$sexo',$trial1_3O,$trial1_3L,$trial1_3OL);";
        $sql = "INSERT INTO neandertaa (trial1_3O,trial1_3L,trial1_3OL)
				VALUES ($trial1_3O,$trial1_3L,$trial1_3OL);";
		$result = mysqli_query($conn,$sql);

		if($result)
        	echo "Jogador inserido!";
        else
        	echo "Jogador NÃO inserido!";

		mysqli_free_result($result);
		mysqli_close($conn);
	 ?>

<a href="index.html">&lt; Voltar</a>
	 <footer style="position:relative">
	 	
	 </footer>    
</body>
</html>