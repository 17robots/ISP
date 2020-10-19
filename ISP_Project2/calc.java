import java.util.ArrayList;
import java.util.Scanner;
import java.util.InputMismatchException;

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

  public static ArrayList<Double> GetNumbers(Scanner in) {
    ArrayList<Double> returnedList = new ArrayList<Double>();
    boolean loop = false;
    while (!loop) {
      System.out.println("Enter The First Number");
      try {
        returnedList.add(in.nextDouble());
        loop = true;
      } catch (InputMismatchException e) {
        System.out.println("Please Enter a Valid Number.");
        in.nextLine();
      }
    }
    loop = false;
    while (!loop) {
      System.out.println("Enter The Second Number");
      try {
        returnedList.add(in.nextDouble());
        loop = true;
      } catch (InputMismatchException e) {
        System.out.println("Please Enter a Valid Number");
        in.nextLine();
      }
    }
    return returnedList;
  }

  public static ArrayList<String> GetOperation(Scanner scan) {
    ArrayList<String> returnedOps = new ArrayList<String>();
    returnedOps.add("");
    returnedOps.add("");
    String returnedString = "";
    boolean isFinished = false;
    do {
      System.out.println("Choose Operation");
      if (!returnedOps.get(1).equals("")) {
        System.out.println("Current Operation: " + returnedOps.get(1));
      }
      System.out.println("+ - Addition");
      System.out.println("- - Subtraction");
      System.out.println("* - Multiplication");
      System.out.println("/ - Division");
      System.out.println("% - Modulus");
      if (!returnedOps.get(1).equals("")) {
        System.out.println("c - Confirm Operation");
      }
      System.out.println("q - quit");
      returnedString = scan.nextLine();
      returnedOps.set(0, returnedString);
      switch (returnedOps.get(0)) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
          returnedOps.set(1, returnedString);
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
    return returnedOps;
  }

  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    ArrayList<Double> numbers;
    ArrayList<String> ops;
    do {
      ops = GetOperation(in);
      if (!ops.get(0).equals("q")) {
        numbers = GetNumbers(in);
        System.out.println(numbers.get(0) + " " + ops.get(1) + " " + numbers.get(1) + " = "
            + PerformOperation(numbers.get(0), numbers.get(1), ops.get(1)));
        in.nextLine();
      }
    } while (!ops.get(0).equals("q"));
    in.close();
    return;
  }
}
