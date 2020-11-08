<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./index.css"/>
  <title>PHP Calculator</title>
</head>
<body>
<div class="container">
  <form action="http://localhost/isp/pa2/calc.php" method="post" id="equation">
    <input type="number" name="number1" placeholder="First Number" value="<?php echo $_POST['number1'];?>" id="num1" step=any required>
    <Select name="operation" id="operation">
      <option value="add">+</option>
      <option value="sub">-</option>
      <option value="mult">*</option>
      <option value="div">/</option>
      <option value="mod">%</option>
    </Select>
    <input type="number" name="number2" placeholder="Second Number" value="<?php echo $_POST['number2'];?>" id="num2" required step=any>
    <input type="submit" value="=">
  </form>
  <span id="answer">
    <?php
      function calculate($a, $b, $op) {
        $result = 0;
        switch($op) {
          case "add":
            $result = $a + $b;
            break;
          case "sub":
            $result = $a - $b;
            break;
          case "mult":
            $result = $a * $b;
            break;
          case "div":
            $result = $a / $b;
            break;
          case "mod":
            $result = $a % $b;
            break;
          default:
        }
        return $result;
      }

      if($_SERVER["REQUEST_METHOD"] == "POST") {
        $num1 = $_POST["number1"];
        $num2 = $_POST["number2"];
        $operation = $_POST["operation"];
        if($num1 != "" && $num2 != "") {
          if(doubleval($num2) == 0 && $operation == "div") {
            echo "Error divide by 0";
          } else if((!ctype_digit($num1) || !ctype_digit($num2)) && $operation == "mod") {
            echo "Error, Use Ints With Modulus";
          } else {
            echo calculate(doubleval($num1), doubleval($num2), $operation); 
          }
        }
      }
    ?>
  </span>
</div>
</body>
</html>