<?php
    header("Content-type:text/html;charset:UTF-8");
    include('dcw-lj.php');
     $a=array();
     class xinxi{
         public $pid;
         public $pfl;
         public $pname;
         public $ptu;
     }
      $sql='set character_set_database=utf8';
      $sql='select * from pic';
      $result=$conn->query($sql);
         if($result->num_rows>0){
            while($row=$result->fetch_assoc()){
                   $c=new xinxi();
                   $c->pid=$row["pid"];
                   $c->pfl=$row["pfl"];
                   $c->pname=$row["pname"];
                   $c->ptu=$row["ptu"];
                   $a[]=$c;
            }
         }
         $conn->close();
         echo json_encode($a);
?>
