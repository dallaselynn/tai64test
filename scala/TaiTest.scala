import org.joda.time._
import org.joda.time.DateTimeZone.UTC
import Tai64._

object TaiTest {
  def main(args: Array[String]): Unit = {
    // val nao = DateTime.now(UTC)
    // val tai = nao.tai64N
    // println(tai)

    
    //val t = E64.fromHex("40000000f487501c") getOrElse Tai64(0L)
    //println(t)
    //println(t date)

    def doIt(hex: String) { 
      val t = E64.fromHex(hex) getOrElse Tai64(0L)
      println(s"$hex ${t.date}")
    }

    List("40000000f487501c", "40000001b09f121c","40000007915fc51c",
         "4000003afff53a9c", "40001ca4f3758a24", "40001ca4f3758a25").foreach(doIt)

  }
}
