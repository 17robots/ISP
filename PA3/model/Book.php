<?php
  include_once("../DB/Connection.php");
  public class Book {
    // members
    public $id;
    public $tite;
    public $price;
    public $quantity;
    public $discontinued;

    // constuctor
    public function __construct($title, $price, $quantity, $discontinued) {
      $this->title = $tite;
      $this->price = $price;
      $this->quantity = $quantity;
      $this->discontinued = $discontinued;
    }

    public function __construct($id, $title, $price, $quantity, $discontinued) {
      $this->id = $id;
      $this->title = $tite;
      $this->price = $price;
      $this->quantity = $quantity;
      $this->discontinued = $discontinued;
    }

    // read
    public static function findAll($options) {
      $conn = new Connection();
      $conn->open();

      $sql = 'SELECT * FROM books;';

      foreach($options as $key => $value) {
        $sql += ' WHERE ' . $key . ' = ' . $value;
      }
      
      $result = msqli_query($conn->get_connection(), $sql);

      $returnedArr = array();

      while($row = mysqli_fetch_assoc($result)) {
        array_push($returnedArr, new Book($row["id"], $row["title"], $row["price"], $row["quantity"], $row["discontinued"]));
      }

      $conn->close();

      return $returnedArr;
    }

    public static function findById($id) {
      $returnedBook;

      $conn = new Connection();
      $conn->open();

      $sql = "SELECT * FROM books WHERE id = " . $id . ';';
      $result = mysqli_query($conn->get_connection(), $sql);

      if(mysqli_num_rows($result) > 0) {
        $returnedBook = new Book(-1, "", -1, -1, 0); // return the error version of the Book to signal there was a problem with the function
      } else {
        $row = mysqli_fetch_assoc($result);
        $returnedBook = new Book($row["id"], $row["title"], $row["price"], $row["quantity"], $row["discontinued"]);
      }

      $conn->close();

      return $returnedBook;
    }

    // create
    public function save() {
      $result;
      $error;
      $conn = new Connection();
      $conn->open();

      $sql = " Insert into " . $conn->get_table() . " (title, price, quantity) VALUES ('" . $title . "', " . $price . ", " . $quantity . ");";
       
      if(mysqli_query($conn->get_connection(), $sql)) {
        
        $result = true;
      } else {
        $result = false;
        $error = mysql_error($conn->get_connection());
      }
      
      $conn->close();
    }

    // update
    public static function updateById($id, $newOptions) {
      
    }

    // delete
    public static function deleteById($id) {
      
    }
  }
?>