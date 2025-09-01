import { memo } from "react";
import { BoxPlot } from "@nivo/boxplot";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedBoxPlot = memo(BoxPlot);

export const fallbackData = [
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.911952757660418
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.811657851958825
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.035145730425894
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.303910562135362
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.081562890215091
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.755050420066429
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.630381957174765
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.890770567951166
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.708867293199388
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.498907248182401
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.0223587460795445
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.898948771319821
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.1934805609868375
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.015866122499832
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 6.230165326381957
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 7.049635318335977
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.527963375731324
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.83986969644842
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.412144750702022
    },
    {
        "group": "Video",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.161211538689812
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.89046291108449
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.592028599107069
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 4.911940259849077
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.106350297234296
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.126742212723235
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.536539732926445
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.535044833610117
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.799234774113573
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.572903436915843
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.634967796702685
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.494217923059887
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.801255531604332
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.725849890064088
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.156340688314835
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.432798368599711
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 4.907497714784298
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.187347347591862
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 4.034593069013635
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.359474887772605
    },
    {
        "group": "Video",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.744375833981483
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 9.303683378965424
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 8.453017896649214
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 8.769505200253118
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.863373572397643
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 8.17597813054351
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 9.479595358037626
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 5.47091206213778
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.8194415128417365
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.342113321310527
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 6.183375116039562
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 6.794065572489954
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 8.237735610642769
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.899317397779356
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 9.681417434874614
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.850520912525241
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.930204951237923
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 9.317639070534401
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 7.882192941766495
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 10.406708419820738
    },
    {
        "group": "Banner",
        "subgroup": "A",
        "mu": 8,
        "sd": 1.4,
        "n": 20,
        "value": 9.759521349721979
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.087672115507967
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.826798723103447
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 9.618154971318772
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 8.582528750124105
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 6.086591281736391
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 8.175855003541212
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 10.29278686983967
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 9.166267368583632
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 5.907239583002216
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 8.54439603379932
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.677176663589257
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 6.869835828261442
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 6.454870122633434
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 9.326635308977437
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 2.8886597247728183
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.928316153180731
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.171170240872597
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.762246824288593
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 7.534934772468199
    },
    {
        "group": "Banner",
        "subgroup": "B",
        "mu": 7.5,
        "sd": 1.4,
        "n": 20,
        "value": 6.643134504211431
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.55578008831107
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.080907448916871
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.247389661857428
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 3.7044299714211197
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 3.883429430834643
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.6425159060018055
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.658646683934866
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.823330289948188
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.7045042744892065
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.731786623571001
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.8767961497194445
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.6329160925475215
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 3.5316772952319933
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.572107773319005
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.496909646883977
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.912547851081438
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.320605421035584
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.811651321176335
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.197247969367067
    },
    {
        "group": "Social Media",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.774114463144672
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 11.294235459957903
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 9.36582167070351
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 6.092590998408796
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 4.48256556479512
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 4.358486002124717
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 5.694104564425842
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 10.02408365620433
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 8.152766707574049
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 8.570961145649028
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 8.194086581503717
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 11.258123079789659
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 6.555261345386079
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 10.631112418137622
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 7.508624461579128
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 9.720500881344147
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 9.0880962973998
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 8.842155571508316
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 6.046647791179291
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 7.101218223919269
    },
    {
        "group": "Social Media",
        "subgroup": "B",
        "mu": 7.2,
        "sd": 1.8,
        "n": 20,
        "value": 5.985530573018234
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.831830539201461
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.420294652640249
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.49389235513593
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.37201625844676
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.3185977310327095
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 3.298460616637631
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.016154514059885
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.4889400838490285
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.460104657345957
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.148123403071098
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 6.874573520233548
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 6.727268248641297
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.518188701451152
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 3.641012294448191
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.132583167786076
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.2381548579628445
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 6.062166092028582
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.74209594531019
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 5.46124131018726
    },
    {
        "group": "Print",
        "subgroup": "A",
        "mu": 5,
        "sd": 1,
        "n": 20,
        "value": 4.434471487566981
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.805589159695862
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.411502109155901
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 6.057520878263127
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.243845393408479
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 7.018581036694385
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.911013464496034
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.9025985868096456
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.4679547459495215
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.819005473128357
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.284999974555313
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 5.878608917795679
    },
    {
        "group": "Print",
        "subgroup": "B",
        "mu": 6,
        "sd": 1,
        "n": 20,
        "value": 4.5206589010755
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.559380043400506
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 6.544295237934973
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 3.3849021105358004
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 3.5060601473025916
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.9150132069932955
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 4.985665284235588
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.182089834758433
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 6.788613094877233
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 7.080232953971629
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 8.101545867056572
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.726400118046132
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.358895903446834
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 6.682441793414767
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 4.151197827811174
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 4.847609666505728
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 3.761107949117307
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.37430680302162
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 6.706851877991641
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 5.045946006940279
    },
    {
        "group": "Radio",
        "subgroup": "A",
        "mu": 5,
        "sd": 1.4,
        "n": 20,
        "value": 2.712134560919571
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.9275393777201266
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.983159637208706
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 8.015160674326351
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 10.9188192309143
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 2.6115844546443183
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.845010944570693
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 5.233649765527889
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 7.461570328238333
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 5.041253514191855
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.2537644099378804
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 15.482335877318935
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 6.946121652109581
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.966925854244156
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": -0.6577718580201655
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 3.0471127630109716
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 10.468155979341523
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 11.222096573232943
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 7.187771063310198
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 9.803174836662944
    },
    {
        "group": "Radio",
        "subgroup": "B",
        "mu": 6,
        "sd": 3,
        "n": 20,
        "value": 4.066865863609149
    }
]

export const SafeBoxPlot = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedBoxPlot data={data || fallbackData} {...props}
                margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
                minValue={0}
                maxValue={10}
                subGroupBy="subgroup"
                padding={0.12}
                enableGridX={true}
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    truncateTickAt: 0
                }}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 0,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'group',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'value',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                colors={{ scheme: 'nivo' }}
                borderRadius={2}
                borderWidth={2}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                medianWidth={2}
                medianColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                whiskerEndSize={0.6}
                whiskerColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                motionConfig="stiff"
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemWidth: 60,
                        itemHeight: 20,
                        itemsSpacing: 3,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        symbolSize: 20,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </ChartErrorBoundary>
    );
};
