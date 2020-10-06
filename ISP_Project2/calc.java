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
    char operation;
    int num1, num2;
    PrintTitle();
  }
}