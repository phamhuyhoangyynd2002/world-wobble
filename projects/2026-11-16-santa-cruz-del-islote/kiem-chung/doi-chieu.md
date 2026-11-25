# Đối chiếu kiểm chứng

- Vòng 1 Claude: claude-opus-5-5 (2026-11-26) · Vòng 2 Gemini: Gemini web (ChatGPT web (tai khoan ca nhan, nguoi lam kenh cho phep o tap 3)) (2026-11-26)
- Mức: A 10 · B 5 · C 6 · D 1 · hai vòng lệch nhau: 12

| Mã | Cảnh | Khẳng định | Claude | Gemini | Vòng 3 | Mức | Việc cần làm |
|---|---|---|---|---|---|---|---|
| C01 | 2 | Santa Cruz del Islote covers roughly one hectare, about the size of two soccer fields. | dung | dung | – | A |  |
| C02 | 2 | Media reports often describe Santa Cruz del Islote as one of the most densely populated islands in the world; the claim depends on population estimates that vary widely. | dung | mau-thuan | – | C |  |
| C03 | 2 | Santa Cruz del Islote is surrounded by larger islands of the San Bernardo archipelago, such as Múcura and Tintipán, which have beaches and vegetation including mangroves. | dung | dung | – | A |  |
| C04 | 2 | According to a story told by locals, the fishermen who first settled on Santa Cruz del Islote chose it because it had no mosquitoes. | dung | dung | – | A |  |
| C05 | 3 | Santa Cruz del Islote is about a two-hour boat ride from Cartagena, Colombia. | dung | mau-thuan | – | C | mức C nhưng lời đọc chưa nói rõ là còn tranh cãi (đặt hedged: true sau khi sửa lời) |
| C06 | 3 | Santa Cruz del Islote is about a one-hour ride by small motorboat (lancha) from Tolú, on Colombia's Caribbean coast. | dung | sai | – | ? | LỆCH: Claude 'dung', Gemini 'sai': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C07 | 3 | Santa Cruz del Islote has around 100 mostly one-storey houses, a school, a restaurant and a small square with a cross that gives the island its name, and no roads or cars. | mau-thuan | khong-ro | – | ? | LỆCH: Claude 'mau-thuan', Gemini 'khong-ro': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C08 | 5 | About 150 years ago Santa Cruz del Islote was a small uninhabited island that fishermen from Cartagena and Tolú used to rest and to shelter from storms. | dung | khong-ro | – | ? | LỆCH: Claude 'dung', Gemini 'khong-ro': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C09 | 6 | According to a story told by locals, fishermen who spent the night on Santa Cruz del Islote found it had no mosquitoes and decided to settle there. | dung | dung | – | B |  |
| C10 | 6 | Unlike neighbouring islands with mangroves and beaches, Santa Cruz del Islote has neither, and locals attribute its lack of mosquitoes to this. | dung | dung | – | A |  |
| C11 | 6 | Residents expanded Santa Cruz del Islote using coral, stone, shells and debris from the sea, and later cement. | dung | dung | – | A |  |
| C12 | 8 | A frequently cited population for Santa Cruz del Islote is about 1,200, while a lifelong resident told CNN it was closer to 900. | dung | mau-thuan | – | C |  |
| C13 | 8 | Colombia's 2018 national census (DANE) counted 432 residents in the population centre of Santa Cruz del Islote. | dung | dung | – | B |  |
| C14 | 8 | Colombia's 2005 national census (DANE) counted 580 residents in the population centre of Santa Cruz del Islote. | dung | dung | – | B |  |
| C15 | 9 | On Santa Cruz del Islote, the Pintuco Foundation and the Colombian Navy repainted the house facades, and nine murals were created together with the community. | dung | dung | – | A |  |
| C16 | 10 | Fishing remains the main livelihood on Santa Cruz del Islote, although tourism is growing. | dung | sai | – | ? | LỆCH: Claude 'dung', Gemini 'sai': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C17 | 10 | Santa Cruz del Islote has no natural fresh water source, and the Colombian Navy has delivered drinking water by boat to communities in the San Bernardo archipelago including Santa Cruz del Islote. | dung | dung | – | A |  |
| C18 | 10 | Bancolombia donated to Santa Cruz del Islote a machine that produces drinking water from water vapour in the air. | dung | dung | – | B |  |
| C19 | 10 | Colombia's Ministry of Housing held meetings on a drinking-water project for Santa Cruz del Islote in which solar-powered seawater desalination was considered as a solution. | dung | khong-ro | – | ? | LỆCH: Claude 'dung', Gemini 'khong-ro': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C20 | 11 | In 2021 Colombia's Ministry of Mines and Energy delivered a hybrid solar-diesel power plant to Santa Cruz del Islote, including a new 125 kVA diesel generator and maintenance of its battery bank. | mau-thuan | dung | – | C | mức C nhưng lời đọc chưa nói rõ là còn tranh cãi (đặt hedged: true sau khi sửa lời) |
| C21 | 11 | Tourism is increasingly important to Santa Cruz del Islote; visitors arrive by speedboat from hotels on nearby islands such as Múcura, and some islanders are reported to work at those hotels. | dung | dung | – | A |  |
| C22 | 13 | The Guardian reported that residents of the San Bernardo islands sometimes wake to find their homes flooded, and that the archipelago sits on average about 2 metres (about 6.5 feet) above sea level. | dung | dung | – | B |  |
| C23 | 13 | A 2014 local government report found erosion affecting about 45% of the San Bernardo archipelago's coastlines, and Maravilla Island, about one hectare, had disappeared by around 2017. | mau-thuan | mau-thuan | – | C | mức C nhưng lời đọc chưa nói rõ là còn tranh cãi (đặt hedged: true sau khi sửa lời) |
| C24 | 13 | Global sea levels are expected to rise by up to about 30 cm (about one foot) by 2050. | dung | dung | – | A |  |
| C25 | 14 | Because of Santa Cruz del Islote's small size, some residents have moved to neighbouring islands such as Tintipán or Múcura, and students who continue their education leave the island. | mau-thuan | khong-ro | – | ? | LỆCH: Claude 'mau-thuan', Gemini 'khong-ro': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
| C26 | 14 | Many students from Santa Cruz del Islote who leave to continue their education later return to the island. | khong-ro | khong-ro | – | D | mức D: phải bỏ khỏi video |
| C27 | 14 | Residents of Santa Cruz del Islote stay close to their fishing grounds, which remain the main livelihood, earn growing income from tourism, and belong to families that have lived on the island since it was settled roughly 150 years ago. | dung | mau-thuan | – | C | mức C nhưng lời đọc chưa nói rõ là còn tranh cãi (đặt hedged: true sau khi sửa lời) |
| C28 | 14 | Santa Cruz del Islote has no space for a cemetery, so the dead are buried on another island. | dung | dung | – | A |  |
| C29 | 15 | Residents of Santa Cruz del Islote enlarged their island by hand with coral and other materials, rely on drinking water delivered by boat, and face flooding and erosion from the sea. | dung | khong-ro | – | ? | LỆCH: Claude 'dung', Gemini 'khong-ro': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ |
