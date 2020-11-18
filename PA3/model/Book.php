<?php
  include_once("../DB/Connection.php");
  class Book {
    // members
    public $id;
    public $title;
    public $price;
    public $quantity;
    public $discontinued;

    // constuctor
    public function __construct() {
      $this->id = -1;
      $this->title = "";
      $this->price = 0;
      $this->quantity = 0;
      $this->discontinued = false;
    }

    public static function ForInsert($title, $price, $quantity) {
      $instance = new self();
      $instance->title = $title;
      $instance->price = $price;
      $instance->quantity = $quantity;
      return $instance;
    }

    public static function ForUpdate($title, $price, $quantity, $discontinued) {
      $instance = new self();
      $instance->title = $title;
      $instance->price = $price;
      $instance->quantity = $quantity;
      $instance->discontinued = $discontinued;
      return $instance;
    }

    public static function ForRead($id, $title, $price, $quantity, $discontinued) {
      $instance = new self();
      $instance->id = $id;
      $instance->title = $title;
      $instance->price = $price;
      $instance->quantity = $quantity;
      $instance->discontinued = $discontinued;
      return $instance;
    }

    // read
    public static function findAll($options) {
      $conn = new Connection();

      $sql = 'SELECT * FROM books';

      foreach($options as $key => $value) {
        if(is_numeric($value)) {
          $sql .= " WHERE $key = $value";
        } else {
          $sql .= " WHERE $key = '$value'";
        }
      }

      $sql .= ' ORDER BY ID';
      
      $result = $conn->query($sql);

      $returnedArr = array();
      if(!$result) return $returnedArr;
      while($row = $result->fetch_assoc()) {
        array_push($returnedArr, Book::ForRead(intval($row["id"]), $row["title"], $row["price"], $row["quantity"], intval($row["discontinued"])));
      }

      $conn->close();

      return $returnedArr;
    }

    public static function findById($id) {
      $returnedBook;

      $conn = new Connection();
      $conn->open();

      $sql = "SELECT * FROM books WHERE id = $id;";
      $result = $conn->query($sql);

      if(mysqli_num_rows($result) > 1) {
        $returnedBook = new Book(); 
      } else {
        $row = mysqli_fetch_assoc($result);
        $returnedBook = Book::ForRead(intval($row["id"]), $row["title"], $row["price"], $row["quantity"], intval($row["discontinued"]));
      }

      $conn->close();

      return $returnedBook;
    }

    // create
    public function save() {
      $conn = new Connection();
      $conn->open();
      $result;
      $sql;
      if($this->id == -1) {
        $sql = "insert into books (title, price, quantity) values('$this->title', $this->price, $this->quantity);";
      } else {
        $sql = "update books set title = '$this->title', price = $this->price, quantity = $this->quantity, discontinued = $this->discontinued where id = $this->id;";
      }

      $result = $conn->query($sql);
      if($result && $this->id == -1) $this->id = $conn->connection->insert_id;
      $conn->close();
      return $result;
    }

    // delete
    public static function deleteById($id) {
      $conn = new Connection();
      $conn->open();

      $sql = "DELETE FROM books WHERE id = $id;";

      $result = $conn->query($sql);
      $conn->close();
      return $result;
    }
  }
?>