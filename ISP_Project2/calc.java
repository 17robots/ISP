import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Calc {

  public static double PerformOperation(double a, double b, String op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return a % b;
      default:
        return -1;
    }
  }

  public static ArrayList<Double> GetNumbers(Double a, Double b, Scanner in) {
    ArrayList<Double> returnedList = new ArrayList<Double>();
    System.out.println("Enter The First Number");
    try {
      returnedList.add(in.nextDouble());

    } catch (Exception e) {

    }
    return returnedList;
  }

  public static String GetOperation(Scanner scan) {
    String returnedString = "";
    boolean isFinished = false;
    do {
      System.out.println("Choose Operation");
      if (returnedString != "") {
        System.out.println("Current Operation: " + returnedString);
      }
      System.out.println("+ - Addition");
      System.out.println("- - Subtraction");
      System.out.println("* - Multiplication");
      System.out.println("/ - Division");
      System.out.println("% - Modulus");
      if (returnedString != "") {
        System.out.println("c - Confirm Operation");
      }
      System.out.println("q - quit");
      returnedString = scan.nextLine();
      switch (returnedString) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
          break;
        case "q":
          isFinished = true;
          break;
        case "c":
          isFinished = true;
          break;
        default:
          System.out.println("Please Choose A Valid Menu Option");
          returnedString = "";
          break;
      }
    } while (!isFinished);
    return returnedString;
  }

  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String op;
    do {
      op = GetOperation(in);
      if (!op.equals("q")) {

      }
    } while (!op.equals("q"));
    in.close();
    return;
  }
}
