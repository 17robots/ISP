<html xmlns = "http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./index.css"/>
  <title>Calculator</title>
  <%!
      public double calculate(double a, double b, String op) {
        double result = 0;
        switch(op) {
        case "add":
          result = (double)(a + b);
          break;
        case "sub":
          result = (double)(a - b);
          break;
        case "mul":
          result = (double)(a * b);
          break;
        case "div":
          result = (double)(a / b);
          break;
        case "mod":
          result = (double)(a % b);
          break;
        default:

      }
        return result;
      }
    %>
</head>

<body>
  <div class="container">
    <form action="http://localhost:8080/isp/pa2/calc.jsp" method="post" id="equation">
      <input type="number" name="number1" placeholder="First Number" id="num1" value="<%=request.getParameter("number1")%>" step=any>
      <Select name="operation" id="operation">
        <option value="add">+</option>
        <option value="sub">-</option>
        <option value="mul">*</option>
        <option value="div">/</option>
        <option value="mod">%</option>
      </Select>
      <input type="number" name="number2" placeholder="Second Number" id="num2" value="<%=request.getParameter("number2")%>" step=any>
      <input type="submit" value="=">
    </form>
    <span id="answer">
      <%
        String num1 = request.getParameter("number1");
        String operation = request.getParameter("operation");
        String num2 = request.getParameter("number2");
        double answer;
        if((num1 != "" && num1 != null) && (num2 != null && num2 != "")) {
          try {
            double number1 = Double.parseDouble(num1), number2 = Double.parseDouble(num2);
            if(!operation.equals("mod") || (number1 == Math.floor(number1) && number2 == Math.floor(number2))) {
              answer = calculate(number1, number2, operation);
              if(Double.isInfinite(answer)) {
                out.println("Error: Divide By 0");
              } else {
                out.println(answer);
              }
            } else {
              out.println("Please Use Integers With Mod");
            }
          } catch(NumberFormatException e) {
            out.println("Please Make Sure Each Number Input Has a Value");
          }
        } else {
          out.println("Please Make Sure Each Number Input Has a Value");
        }
      %>
    </span>
  </div>
</body>
</html>
