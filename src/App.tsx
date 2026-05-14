import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { Mail, Heart, Music, VolumeX } from "lucide-react";

const MESSAGES = [
  "aku tau akhir akhir ini hari kamu berat fre, banyak hal yang lagi kamu pikirin dan kamu udah cape banget,",
  "aku tau kadang kamu penuh sama rasa takut tapi kamu tetep ngejalanin semuanya, tetep jalan meski hati kamu lagi ga baik-baik aja.",
  "selama ini kamu nahan semuanya sendiri, padahal ada bagian dari kamu yang udah lelah banget,",
  "tapi di depan orang lain kamu selalu nyoba keliatan ga kenapa kenapa dan itu exhausting fre.",
  "bukan berarti aku bilang kamu lemah ya, justru sebaliknya, tapi nahan semuanya sendirian itu beban yang harusnya ga kamu pikul sendiri.",
  "ga banyak yang liat perjuangan kamu, tapi aku liat, dan aku bangga banget sama kamu.",
  "bukan berarti aku ngira kamu ada apa apa ya, kamu bilang ga kenapa kenapa kan?",
  "tapi aku mau jujur soal satu hal dan ini bukan bentuk tuduhan ya fre, aku cuma mau kamu tau perspektif aku.",
  "perubahan tiba tiba tanpa kejelasan, menghilang mungkin buat kamu itu terasa kayak self protection, cara kamu survive, dan aku ngerti itu sepenuhnya.",
  "tapi tanpa kamu sadar, itu nyiptain kekhawatiran yang dalam buat orang yang peduli sama kamu.",
  'waktu kamu bilang "aslinya emang kaya gitu, kalau kamu keberatan yaudah gapapa"... aku diem lama baca itu fre. bukan marah, sama sekali bukan tapi aku beneran gatau harus ngerti kamu yang mana, dan kebingungan kalau kamu gitu.',
  "kalau kamu sadar fre, selama ini aku ngapain sih negur sikap kamu? kalau tau mending aku diem aja biarin, ya kan? tapi aku sadar fre, sebagai lelaki aku harus negur hal yang kurang baik itu.",
  "terus aku ada ngetik dan inilah kenapa kalau ketik harus kira kira.",
  "kalau kamu sadar fre, sekarang ini posisinya aku sama seperti kamu waktu SMP. aku bukan ungkit masalah kamu ya, aku cuma ngasih contoh dari pengalaman kamu sendiri tau kan rasanya?",
  "tapi aku marah ga? engga. tapi aku nyari solusi, cape ga? cape dong pasti. terus kenapa ga nyerah aja terus aku benci kamu? ya karena aku sayang sama kamu, udah simpel.",
  "kalau kaya gini terus gabakal selesai kita fre, ya Allah.",
  "menurut aku, ketika seseorang tiba tiba menarik diri, itu seringkali bukan karena mereka ga peduli tapi justru karena mereka overwhelmed sama sesuatu yang belum bisa mereka artikulasikan.",
  "aku tau itu fre, dan aku ga judge kamu soal itu. aku ga minta kamu langsung punya semua jawabannya.",
  "aku cuma minta kamu ga ngebiarin jarak ini jadi dinding.",
  "i've been trying fre, i really have berbagai cara buat reach out, buat mastiin kamu baik baik aja, karena aku ga bisa diem aja ngeliat kamu kaya gini.",
  "bukan karena aku ga percaya kamu, tapi karena kamu penting buat aku.",
  "dalam islam Allah ga pernah biarin hamba Nya sendirian dan aku juga ga akan.",
  "banyak first experience sama kamu, kamu banyak bikin aku berubah jadi lebih baik, dan semua itu bukan sesuatu yang bisa aku akhirin begitu aja.",
  "aku mau kaya dulu aja fre, ketawa ketiwi, kita cuma perlu ngerti satu sama lain dan itu butuh dua orang yang sama sama mau nyoba, bukan berarti aku nyalahin kamu sendirian ya, aku tau ini proses buat kita berdua.",
  "seberapapun lama itu, aku selalu nunggu kamu. nunggu kamu mau cerita, nunggu kamu siap, nunggu kamu balik lagi ga kemana mana.",
  "dan jujur fre... tanpa kamu sadar kamu bikin aku ngerasain sesuatu yang susah banget aku jelasin, ini hal terberat selama kita bersama.",
  "kalau kamu tau, selama ini ada momen kamu marah dan kamu terbawa emosi kamu sampe sampe ngeluarin ketikan yang tidak sengaja membuat someone feel like.... entahlah,",
  "bukan berarti aku bilang kamu ga pernah ngertiin aku ya, justru banyak hal yang udah kamu lakuin dan aku sangat ngeliat dan ngehargain itu tapi yang ak maksud waktu emosi dan rasa kesal, itu ngebuat kamu jadi hilang kontrol,",
  "tapi kalau kamu paham aku cuma ingin ngerasa semua itu cuma butuh satu hal kecil: kamu ngerti apa yang aku rasain di momen itu.",
  "aku cuma mau kamu tenangin aku, atau kasih kejelasan kecil aja, itu udah lebih dari cukup buat aku, atau mungkin cara ak kurang cocok dikamu, kamu tinggal bilang aja.",
  "sama kayak yang aku coba lakuin ke kamu waktu kamu lagi sedih bukan karena terpaksa, tapi karena aku peduli. aku cuma mau itu aja fre.",
  "aku tau ini mungkin belum pernah kamu lakuin sebelumnya dan itu oke, kita sama sama belajar tapi tolong, coba ngerti dari sisi aku juga.",
  "i hope u understand what i mean. aku cuma mau berharap suatu hari kita bisa ketawa kaya dulu lagi, aku tau bagian ini sedikit kurang nyambung tapi=.",
  "kalau kamu sadar, itu sebenarnya nyambung dengan maksud yang kamu ketik bisa implusif.",
];


// ─── Sprite Image Data ─────────────────────────────────────────
const CAT_WALK_FRAMES = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABfElEQVR4nO2ZsY7DIAyGndO9XabMhKdLOmfKe3Xozg0ndCSC1mAbc5I/qUMV0frnt8FuAQzDMAwG1nkJ67wE7ThIrPMSwvMVwvOFFvMlHVSkdXe3x4ZaSxKCDW6dl4ANqDvR/k/BtaTJfR1m7Tf2g0tsjw3A+bCfx5QGcXnewH4eEzgfsOvJQgD+xFzed4ZFCAAu+Jx7XIieWt558M5LfgWdexHnijN9X1vwtYcEObW889m06l0n5NSSCDjeOwC/G4WpKdYaGb4ecpRq4N0Lk+utF2izI/t5TP/SgRI1zki1MwAMNVLrTGnOSAtcDWq91DaIOdhalFrS/ix1AnvcstPiBuVUK9FtQvwE1YkhhKilU4QjrbjG3yEc4cCEjIa6EK6fiUhCRmoc1R3honvTKOWgOTIaKkLu6cVxcpGFxIEIk/uSPZWKIxLHdjch0h0uy4T4bnfjM+k2nSzkEmDh/4ySiHQDqELVZnZuh+weyaHZRIoUYHq5qc7ihiI/piNA2GUxQdgAAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABYklEQVR4nO2YPQ7CMAyFDeJ2nTq3OV1hZuJeDOxhwRJqk8bOX18lf1IlRI2aR/zsxkSGYRiGYRzLPIz+6DUUMw+j9++PP7UYFsFXDTHXGgtD4Nb7gfMw+uWxBL/nz/fX8yK9x3QXEmIjbHL+/npeWADfd5PrvrYga2/sXVofdfNILKViaGKJAMzuJpdMGTe5qDe6IkmpvRiYXqPxBi9c2zAhqtYarT+IADxSCzghub2ieiWI5XROumiqVVWPxHqF9l/m+ENKrrYy1S61VTyi7dotKBaCIIIIsGotjyXrCFwkBGU3iAB3JBcT0iqtcl/ZbUdaUHKAghJSQpYQpLLLwBysYmklmWkRAQkJsdn537wrFAvrEW36wgrRIk6tliMZPkj9P0NbTERC1tvcYgabWniqxySbD0KplTRK6KqlObtDCVmnrOZ1RRQYMro03UJ+ik1aSqYm2T+UVrFUt96LM87MFymTnsGkGZ+eAAAAAElFTkSuQmCC",
];

const CAT_SIT_FRAMES = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABDElEQVR4nO2XsQ6DIBCGz6Zvx8QsPB06O/W9OnSnS2lOqomAB9j8X8IgIXi//MedRAAAAAAAAAAAAAAAgBVGad86hmKM0t4/X76WmJvEpkZp72YnsfUu96ML+ZedHsuwNR+oLYIoQQgRC3C0/meuMUlCAr0EzxHJEY6bXZXbS0yIHS3Z0UptX0a4UvkwSn8Hn4vXtI59xVaAsbC9IS0myVrTYxm4XXpKepEciXMjPAcLSrwzmRQ77dnvsmJq5Ix4Heme3k7lb04kq9c6k/hUeGedQlMhm3Xo01mnCurOWrlFtrm1OKFw5tgry4+B0l/auAPIzQ+ik08kBBaL22vnSwKPKd7oSC04M2BwFd5LnXmauHapjAAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABM0lEQVR4nO2WPQ6DMAyFTdXbMTEHny4wM3GvDuzuFJSiQmNjfiq9T0JCKAl+ebYTIgAAAAAAAAAAAAAAgJq2bqStG9m7zsMjmL3EPtJeMZcKaetGYh9d1rqFI0T7XXEX4pXzWlyFaFLFM62IHIXkgXkUrxaVkLXgtE4cIfJZOnAONrB041DlwZSISOM908lEWzcir0nkNUn+vvWk4LXjLRQ7klO6q8nBM1xw7VocmDiw55LFuAnhwBT7SLGPH2LOqolKM9i79y/hwNSNgyqmhKlGjtrxvCtq55qEzD/9Z7610tL2WvpY2rBLsd/BHbWQbhyqq1rsFqYa6cahosAf9ltcSRtyB0dntHWydX25rEa0bJ0X1rPE3H5/sZY2y0CXaWo9EE2T1shTYnnVz797/hPclTcZxoA7e0eRnAAAAABJRU5ErkJggg==",
];

const BIRD_FRAMES = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAACrUlEQVR4nO2YMU/bQBTH/1chJiTUwa1K0slIVbqBOmTIV4A5EhsDc4bsiBVlyApDN74AiKHfIEvCRhY8tWHJhFSV8TpgG/sfn23su4RI7ydZip1n6+nn9853p7TWEF75sOoE3hsihBAhhAghRAghQggRQogQQoQQIoQQIcTGqhOogu/vRwswFQQTq89W67a4S8gAAAVAw6KYd10hvr9fFGL9ba7bGOK8nJ1WiKnXw+sqCCZRFXAbZGGSYYqvxLIqREdyEpKia2Xe+tIGuqW2DA2IWWS97aJ7NF7kVkuKcCokCCZ1y7lsZVhrG6dCKrw1bfhNbCVP1mcMCQfSKgmvRAZg+SvTbh+a/oomUPC8pvH++fwPUErG39RVm7NV5xMzz2uWGgdCGQWkRCjArgzAbcuU/aQWyNjKumi9VSJcCSk9byiujNeqCNstlmG7OgA3QmIZ5+f93MBybfIiIhp7PK+po6NGjkasrXYvj3b1z+B76fikDNNAmxeT+M9qxdQScnm0C1B7vEVKVQyVZWULoG7LLNg89u9rPjKfnDbTJZYGhdgeQ1RehYxG1za+DqrgqEXdechCAsf+vTq5esgMDiduqXtGo2ucHuxoAOrX/Ae6nbHuDWaq3T7U4f+peFuLOBNWJmb/vjynzof9Bi5uPy3EbW9/TZ0nZQBAtzOOS77bGauL289otfbi+On0DpubGtPpnY20M6nVMidXDwsyIrKSfnr6HR8JGQCAj9+UBoDeYKaG/UbmM1utPacygBVuMp8e7ODs5jGWcnbzqIb9RrzDFsX1BrOl5rV2u+6uWbdNZueIEEKEECKEECGECCFECCFCCBFCiBBChBAihBAhhAghRAghQggRQogQQoQQIoQQIYQIIUQIIUIIEUKIEEKEECKEECGECCFECCFCiP91RdXmVt6vWwAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAACOElEQVR4nO3ZLU/DUBjF8XMJXwCxAAM3EgIOMHyJkaBxCBwJYn6ZJQiSOQQKEhwJfAUEajhmqOIlIVMYkBfBbunOuq1dnzHE+SckpGvven/0bcN576F+m5n2Dvy3BEIJhBIIJRBKIJRAKIFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCDU7iUErlc3Ub66jqOW6r7koalm9V3L8wuM562/dB2GMKoparrt95oklMbpjjPPWPZmCZMEolZYzj9fpvABDjqYAYnW0AfYgAOCBfBMH4sn3lByj03lxo8awgDG9qHYn4CwwwvLwUyot/8l/1MzvMskdPz6ujVx/EMaA9SaOYnbKnO2t+PNoPdc2WTGG1HMaTf2iera3AtBfLSuKAQZncisvCpK6cd4jJWSEVAjG+hrixsUAfi7KeS/IKRW6BhR9Uu27Fe5XHt3n4heu7raAMXeObreF9idvE3l0D93f38Q7uL2904cTXq9Xyx6Au3hcwOHuuz86eXWJ9cMYvH3hyadlAvK5+NW37OPjGWtrG8lF8QTa7QcAQL1aBn4m6gDgcPc9nnTKg9hEALhCIAeXTzitLaW+1m4/MEhaMcDcqvMA0Lyed83rzcFbJLJ8ZA+Zf7jLUr1aRuP2LfzuAaBx++ZOa0t8muDo5PVP920qIP85fUFECYQSCCUQSiCUQCiBUAKhBEIJhBIIJRBKIJRAKIFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCCUQSiCUQCiBUN8KBrpExnq5aAAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAACKElEQVR4nO3Zv0rDQADH8d+Js+AQBO0WoeDYKS+hL+DmM3QXRzsV3Dr4CkJ9iUyObt2KSx7iHPTs9Wf+XXNpo/y+UFBML8nHu3hYY62F2nR06AsYWgKhBEIJhBIIJRBKIJRAKIFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCHW8rxOl6cQmyajuEJPnS6TpBKvVW9sxAaD18W0yfX0MkWU3nQcuijUAmKob/jMgIRjfN12aP6OKYm2qjosJEvUZkmU3Wxiz2bT2+DoM93P3SpLRXj5RizZDFreX9nl1FfSeJhC/kuePce8fzJJZ3F4CwNYAoShAZxjk+bJyOYXWdcn80rxL3zsOWZ9bQl7RMID4+xCzywxJklHpb77pXIiMAXQHMfTCXfpu/IdhyHIIqSjWvTxkO2/MHvMT/9vSi/RRdpgJleX5MtpYrlg71dB9x9Zm6/763AIwD/kH0nTSeqyQXW3betmYuR1kXe5GfjBePzCfXtinl7OQUxl/rBh1niF88yEX940BhxF46ugYQIQZ0jQbyi74/vocwBeEQwFgTsfGAkDLWTJMkF3zUVzz6QUA4OnlrOqiDL6eV71gAAcEATYoAHA63mwpGkB++ncgXMUMcbPCfQ2gHwxgYCAu70+vA7DYAwYwUJBDpv+pUgKhBEIJhBIIJRBKIJRAKIFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCCUQSiCUQCiBUAKhBEJ9AghX2amQ5xSlAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAB/klEQVR4nO3ZMVLCQACF4beOtR2dXagsqXIKLmBnwQkc7iDjCSjsvEBOsRWllenocohYyGLyTEI2u4tx5v0zFA5ZhC+bbAKmrmuon27++g3MLYFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCCUQSiCUQCiBUAKhBEIJhLpN9cJ5vvb9Ot9YWyDLVijLw6gBPtuOfhMpfoaYgDGUsbbofGL2IHm+BoDzC+52z9huXwfHVNWx97nF4r65nenaZrYg+8dl/VY+eI0ZwnBdQpkVyP5xCTRmBAD4oIwBAdoo1hYG+J6NfYdSSKEgnYNTzBSgDYOBc0tIsZdd44vhE8El+VE6FMTQA0/Zh7G2MNYWpqqOcI8URV7NAFzxwiwiTOdqE6vgC7MXewfg99k+y1ade6+qjnwumJJDiT5DolypjsVwuZlSlgdzaVv6P+cV5lT02RIEsnn/xGb68Mkfxq0uDZhoBc+QLFu1/h55oWROY4OmfIqTdfSTKgPFyh0uqUtycwcM7n3vE2IXRoobOyDhstuzR8dgnMeV5cH0YaQqyfchPXtvCKP1ofsOjyZEitkBJDxkXI1Dh0G8buevgQFcAeS/pe9UKYFQAqEEQgmEEgglEEoglEAogVACoQRCCYQSCCUQSiCUQCiBUAKhBEIJhBIIJRBKIJRAKIFQAqG+ACHmvpSkwy6nAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAACKElEQVR4nO2ZMU7DMBiFnxFzt0qodAsTYydfopGY4Qps7FVHmJg7MHECuESmjGzeEAL1EGYohvQ1aZPGLiC9b6oa23E+//5tJ8Z7D/HD0W934K8hIYSEEBJCSAghIYSEEBJCSAghIYSEEBJCSAghIYSEEBJCSAghIYSEEBJCSAhxfIibZNkkvNo3zpVN16pslDsUJtVnCGvznQ0vl69brztXGmtzFMVTtH7tIkmExJABrKJnOBwDgMmyycb1FFEUNYdYm6/JuLu7qS3XRka1rLW5d65MIoCJNmUWl2f+wZ23Lt9FCgB8RQqK4sl0qtiRXkIWl2cAsNZAWylByHA4bi2nKiVVbukrpLZyl0gBukVL6kiJmkNui0FnGfvSJnHvQ99VhkfJ7xrtMMJ/ld7L7m0xCD9bjdhy+dpXiml7r32Isg9xrkTdPqEJnv8Nu1W+R3UvkkxKtGX3q7NbG3Ou3EiEs+nIAzCPLyeNdUlGNbHu2dtmekcIRca2kWuS0UidQOdKWJt36WInUpx265ZDniKYTUeYP7+F//3V+ftaGZYRdqlBRqrzTfTDXc3U+X6wkGucKzGbjjbqzp/fkGUTXxcZIRKDmNBObFK9DzHA+ihXZQCrh2fub05xffHRSkYqkh3//yt6Y0ZICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJ8AmFFyFqHFiY2AAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAACY0lEQVR4nO2ZP2rcQBTGvwmpAynULNspEEhj2GouEV0gXQqfIDhlcBmTE6RI5wvYl1Al2CYQ8HRGzRaBXGBSRJJHn7X6O1qb8P1gYZfdGc389N7TY9Z47yEeePHUC3huSAghIYSEEBJCSAghIYSEEBJCSAghIYSEEBJCSAghIYSEEBJCvFz7Amm6C4/kjHPFmDGtz2PGxCKaEN5EBZ9P+jTddUohcQBgIi1tEmtFSN9BbUtKh4gnZY0aMmaDPk13QzL8KVOlJraQqHc7TXe9Uo6k6SJiChmUkSTb5lX/vizvBydeY+PHiFJDukK/2nQnh8OwhHBu5wpzKimLI2SqjC7GRAlwmsdvzJQxQFvG1dWn3gFjRVib+STZemsz71zRpN0agmIIMQDMZ/vHc2RcXHzrHBD+7uzMAuiXE6aYtZlH5OIdYpb8t/v9wxuAFvfDvZs1136fAwA2m+PpForM85tVGrelEfLI5sf056yJZkZKdKL2IefXd6YvQobuai2lC+cKkyTb1vg1pCxOma/5KwDTngBDG9nv8yZ1nCsM8NCLhNexNkOe30xcdT9R+pCp1Z4j5cv7jUf1lHr91vjDoakVjyLK2mzeIkeyKGXOr+8WP/pYBgCU5X1LRNiUTWnq5hCjMZvdWlcycHlbNjIAmCpdWqlSE96ANeREK6pDUsLv6/eXt6UB/on5/cvXUdFbX+qUiV07ahYV1f8RnakSEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICCEhhIQQEkJICPEXl07AYHyr7hIAAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAC1klEQVR4nO2ZvY6bQBSFz0SpI6WgcehmpUhpkEgzL2G/wHYp8gTbW1tmq9RbpFsptfcVtqByuVKk0CEaijzCpGFYfMBeMDOYRPeTLMs/GpiPc++MQFlrIbzw5tInsDRECCFCCBFCiBBi0UK0Tq3W6azHXLSQmlmlvPU5mNap29SoPN/7GmtWQiXEap3i3Cs7d5m08ZqQKZCEi22fQ/YQ75NqSwuVIt9CFH1+tXR6fu8TaeueErzBzrHKWOBl4q9MaHCq8nwfJCVz9RCLbnoGU5YFVqsYboyQKVnSPmRUOtrvPplTiI8maz2Nc5QQQs4pjVGT/J9KZvG357wJmXDVxko6uzkPIVRCTp300b1EWRaDDxCioQKX27pbrVOFnnS0ltijhJIBeE5Inu+bF0ZGuywLJInp/b4l6GDMEM3VmxC+arWYgwlEUdy8UKeDyyRJTG/plGURtHc4gpWMMRsLwE3+gKrqTvhUOljGP7fsOhlDYWlJYnpFtlMYRbGNotj7Mu5dSFvG3d3NpLGcmCQxNkmMNWZj83yPECIcytejzPvrK/sj/zT4/1VVHG2kY8iyndfeMknI/fUVQEvnGCljqKqiU0a+ZQDTS6Zj84t+njhkF9eE3XuW7VQIGYDnHvL14bc6lZCxk6iqopEQRbGKojiYCMfkkvmWvQMwbvc4YhVSWbaDMZtGTPs4xmyQZbvBxx2Cl33I2K00X+XtemUBqNvHEt9vPtifT58V/R9ap81xjNlMPOPjeFtlzsXJAID3H5UFgLYQJ8PR01i9ns/kHjLlgVQtA7ePZSMDgHK9o6qKzthtAX073qnMdj+En6ls1yugTsZ2vbJ/flmXipORdeXiOxmOi5fM0ljSXfdFIEIIEUKIEEKEECKEECGECCFECCFCCBFCiBBChBAihBAhhAghRAghQggRQogQQoQQIoQQIYQIIUQIIUIIEUKIEEKEECKEECHEX+kVDO3IjtD/AAAAAElFTkSuQmCC",
];

// ─── Animated Image Sprite ────────────────────────────────────
function ImageSprite({
  frames,
  fps = 4,
  scale = 4,
  style,
}: {
  frames: string[];
  fps?: number;
  scale?: number;
  style?: React.CSSProperties;
}) {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((i) => (i + 1) % frames.length);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [frames, fps]);

  return (
    <img
      src={frames[frameIdx]}
      style={{
        imageRendering: "pixelated",
        display: "block",
        transform: `scale(${scale / 2})`,
        transformOrigin: "top left",
        ...style,
      }}
      alt=""
    />
  );
}

// ─── Moving Cat ──────────────────────────────────────────────
function MovingCat({
  bottom,
  duration,
  delay = 0,
  scale = 4,
  reverse = false,
  repeatDelay = 3,
}: {
  bottom: number | string;
  duration: number;
  delay?: number;
  scale?: number;
  reverse?: boolean;
  repeatDelay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom }}
      initial={{ x: reverse ? "115vw" : "-15vw" }}
      animate={{ x: reverse ? "-15vw" : "115vw" }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay, ease: "linear" }}
    >
      <div style={{ transform: reverse ? "scaleX(-1)" : "none" }}>
        <ImageSprite frames={CAT_WALK_FRAMES} fps={6} scale={scale} />
      </div>
    </motion.div>
  );
}

// ─── Moving Bird ─────────────────────────────────────────────
function MovingBird({
  top,
  duration,
  delay = 0,
  scale = 4,
  reverse = false,
}: {
  top: number | string;
  duration: number;
  delay?: number;
  scale?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top }}
      initial={{ x: reverse ? "115vw" : "-12vw" }}
      animate={{
        x: reverse ? "-12vw" : "115vw",
        y: [0, -18, 10, -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        y: { duration: duration * 0.35, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div style={{ transform: !reverse ? "scaleX(-1)" : "none", opacity: 0.5 }}>
        <ImageSprite frames={BIRD_FRAMES} fps={5} scale={scale} />
      </div>
    </motion.div>
  );
}

// ─── Typewriter ──────────────────────────────────────────────
function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    let active = true;
    setDisplayed("");
    setIsDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (!active) { clearInterval(timer); return; }
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        setIsDone(true);
        if (onCompleteRef.current)
          setTimeout(() => { if (active) onCompleteRef.current!(); }, 700);
      }
    }, 45);
    return () => { active = false; };
  }, [text]);

  return (
    <span className="relative">
      {displayed}
      {!isDone && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] h-5 bg-melody-pink/60 ml-1 translate-y-1"
        />
      )}
    </span>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [started, setStarted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play music saat user klik "Buka surat"
  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  useEffect(() => {
    if (started) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [currentLineIndex, showClosing, started]);

  const handleLineComplete = () => {
    if (currentLineIndex < MESSAGES.length - 1) {
      setCurrentLineIndex((p) => p + 1);
    } else {
      setTimeout(() => setShowClosing(true), 1200);
    }
  };

  return (
    <div className="min-h-screen letter-gradient selection:bg-melody-pink selection:text-white flex flex-col items-center relative overflow-hidden">

      {/* Audio element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Birds */}
        <MovingBird top="7vh" duration={24} delay={0} scale={4} reverse={false} />
        <MovingBird top="22vh" duration={32} delay={9} scale={3} reverse={true} />
        <MovingBird top="55vh" duration={27} delay={16} scale={3} reverse={false} />

        {/* Cats */}
        <MovingCat bottom={4} duration={18} delay={0} scale={4} reverse={false} repeatDelay={4} />
        <MovingCat bottom={52} duration={27} delay={7} scale={3} reverse={true} repeatDelay={5} />
        <MovingCat bottom={20} duration={22} delay={13} scale={3} reverse={false} repeatDelay={7} />

        {/* Floating hearts */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-melody-pink/20"
            initial={{ y: "110vh", x: `${8 + i * 13}vw` }}
            animate={{ y: "-10vh", x: `${8 + i * 13 + (i % 2 === 0 ? 5 : -5)}vw`, rotate: 360 }}
            transition={{ duration: 13 + i * 2.2, repeat: Infinity, ease: "linear", delay: i * 1.7 }}
          >
            <Heart fill="currentColor" size={i % 3 === 0 ? 20 : 13} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="flex-1 flex flex-col items-center justify-center space-y-8 w-full min-h-screen relative z-10"
          >
            <div className="space-y-4 text-center">
              <h1 className="font-serif italic text-4xl md:text-5xl text-melody-dark tracking-wide font-medium">
                dibaca ya, jangan bosen bosen, bentar lagi selesai kok, ak berharap bisa ketawa kaya dulu lagi (btw.itu gaya kucing emang dari animasi yang buat ya, bukan aku).
              </h1>
              <div className="h-px w-12 bg-melody-pink mx-auto" />
            </div>

            {/* Sitting blinking cat on intro */}
            <ImageSprite frames={CAT_SIT_FRAMES} fps={0.4} scale={5} />

            <button
              onClick={() => handleStart()}
              className="group flex flex-col items-center gap-4 hover:opacity-70 transition-opacity duration-300"
            >
              <div className="w-14 h-14 rounded-full border border-melody-pink/40 flex items-center justify-center bg-white shadow-sm transition-transform duration-500 ease-out group-hover:scale-110">
                <Mail size={20} className="text-melody-pink" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-melody-dark/60 font-medium">
                Buka surat
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl px-6 py-20 md:py-32 flex flex-col gap-8 md:gap-10 relative z-10"
            ref={containerRef}
          >
            <div className="flex justify-between items-center border-b border-melody-pink/20 pb-8 mb-4">
              <span className="text-xs font-sans text-melody-dark/40 tracking-[0.2em] uppercase">
                Private Note
              </span>
              <Heart size={14} className="text-melody-pink/40" />
            </div>

            <div className="space-y-10 md:space-y-12">
              {MESSAGES.slice(0, currentLineIndex + 1).map((msg, index) => (
                <p
                  key={index}
                  className="font-serif text-xl md:text-2xl leading-[1.8] md:leading-[2] text-melody-dark/90 tracking-[0.01em]"
                >
                  {index === currentLineIndex ? (
                    <TypewriterText text={msg} onComplete={handleLineComplete} />
                  ) : (
                    <span>{msg}</span>
                  )}
                </p>
              ))}
            </div>

            <AnimatePresence>
              {showClosing && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-20 pt-16 border-t border-melody-pink/10 flex flex-col items-center text-center space-y-6 relative"
                >
                  <div className="absolute -top-8">
                    <ImageSprite frames={CAT_SIT_FRAMES} fps={0.4} scale={4} />
                  </div>
                  <p className="font-serif italic text-2xl md:text-3xl text-melody-dark mb-4 drop-shadow-sm font-medium mt-6">
                    "Innallaha ma'ashobirin."
                  </p>
                  <p className="font-sans text-sm md:text-base text-melody-dark/60 tracking-wide font-light max-w-md">
                    Sesungguhnya Allah bersama orang orang yang sabar.
                  </p>
                  <div className="pt-16 pb-10">
                    <div className="w-1 h-1 rounded-full bg-melody-pink/50 mx-auto" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music toggle button */}
      {started && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-melody-pink/30 shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300"
          title={isPlaying ? "Pause musik" : "Play musik"}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          >
            {isPlaying
              ? <Music size={16} className="text-melody-pink" />
              : <VolumeX size={16} className="text-melody-dark/40" />
            }
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
