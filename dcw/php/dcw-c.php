<?php
    header("Content-type:text/html;charset:UTF-8");
    include('dcw-lj.php');
    $jyhm=$_REQUEST['jyhm'];
    $jpwd=$_REQUEST['jpwd'];
    $jlxfs=$_REQUEST['jlxfs'];
    $sql="insert into yhxx(dyhm,dpwd,dlxfs)values('$jyhm','$jpwd','$jlxfs')";
    if($conn->query($sql)===true){
                  echo 'ok';
               }else{
                  echo 'Error:'.$sql1.'<br>'.$conn->errpr;
               }
       $conn->close();
?>
