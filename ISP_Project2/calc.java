import java.util.Scanner;

class Calc {
  private static void PrintTitle() {
    System.out.println("Calculator By Matthew Dray");
    return;
  }

  private static void PrintMenu() {
    System.out.println("Available Menu Options");
    System.out.println("+ - Addition");
    System.out.println("- - Subtraction");
    System.out.println("* - Multiplication");
    System.out.println("/ - Division");
    System.out.println("% - Modulus");
    System.out.println("q - Quit");
    return;
  }

  public static void main(String[] args) {
    String operation;
    double num1, num2;
    PrintTitle();
    Scanner in = new Scanner(System.in);
    boolean exitMenu = false;
    do {
      PrintMenu();
      operation = in.next();
      switch (operation) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":

          break;
        case "q":
          exitMenu = true;
          break;
        default:
          System.out.println("Please Select An Item On The Menu");
          break;
      }
    } while (!exitMenu);
    in.close();
  }
}