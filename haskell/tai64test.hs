module Main where

  import Data.Text (pack)
  import Data.Either (rights)
  import Data.Time.Clock.TAI64 (fromText, libtai, libtaiToUTC)

  main = do 
    let labels = [pack l | l <- ["40000000f487501c", "40000001b09f121c","40000007915fc51c", "4000003afff53a9c", "40001ca4f3758a24", "40001ca4f3758a25"]]
    let tais = rights [libtai <$> fromText l | l <- labels]
    mapM_ print [libtaiToUTC t | t <- tais]
