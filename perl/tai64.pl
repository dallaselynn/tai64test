use strict;
use warnings;
use DateTime::Format::Epoch::TAI64;

#40000000f487501c 000  Fri 2100-01-01 17:42:15 +0000
#40000001b09f121c 000  Wed 2200-01-01 17:42:15 +0000
#40000007915fc51c 000  Wed 3000-01-01 17:42:15 +0000
#4000003afff53a9c 000  Sat 10000-01-01 17:42:15 +0000
#40001ca4f3758a24 364  Fri 999999-12-31 23:59:59 +0000
#40001ca4f3758a25 000  Sat 1000000-01-01 00:00:00 +0000

my @labels = (
  '4611686019483526367',
  '40000000f487501c', '40000001b09f121c','40000007915fc51c',
  '4000003afff53a9c', '40001ca4f3758a24', '40001ca4f3758a25'
);

my $formatter = DateTime::Format::Epoch::TAI64->new();

foreach my $l (@labels) {
    my $dt = $formatter->parse_datetime($l);
    print("$l $dt\n");
}
