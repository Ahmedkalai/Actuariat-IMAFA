from flask import Flask, render_template, request, jsonify
import numpy as np
from flask_cors import CORS
import urllib.request

# lx TD88-90
l_x = {
    "TD88-90": [100000, 99129, 99057, 99010, 98977, 98948, 98921, 98897, 98876, 98855, 98835, 98814, 98793, 98771,
                98745, 98712, 98667, 98606, 98520, 98406, 98277, 98137, 97987, 97830, 97677, 97524, 97373, 97222, 97070,
                96916, 96759, 96597, 96429, 96255, 96071, 95878, 95676, 95463, 95237, 94997, 94746, 94476, 94182, 93868,
                93515, 93133, 92727, 92295, 91833, 91332, 90778, 90171, 89511, 88791, 88011, 87165, 86241, 85256, 84211,
                83083, 81884, 80602, 79243, 77807, 76295, 74720, 73075, 71366, 69559, 67655, 65649, 63543, 61285, 58911,
                56416, 53818, 51086, 48251, 45284, 42203, 39041, 35824, 32518, 29220, 25962, 22780, 19725, 16843, 14133,
                11625, 9389, 7438, 5763, 4350, 3211, 2315, 1635, 1115, 740, 453, 263, 145, 76, 37, 17, 7, 2],
    "TV88-90": [100000, 99352, 99294, 99261, 99236, 99214, 99194, 99177, 99161, 99145, 99129, 99112, 99096, 99081,
                99062, 99041, 99018, 98989, 98955, 98913, 98869, 98823, 98778, 98734, 98689, 98640, 98590, 98537, 98482,
                98428, 98371, 98310, 98247, 98182, 98111, 98031, 97942, 97851, 97753, 97648, 97534, 97413, 97282, 97138,
                96981, 96810, 96622, 96424, 96218, 95995, 95752, 95488, 95202, 94892, 94560, 94215, 93848, 93447, 93014,
                92545, 92050, 91523, 90954, 90343, 89687, 88978, 88226, 87409, 86513, 85522, 84440, 83251, 81936, 80484,
                78880, 77104, 75136, 72981, 70597, 67962, 65043, 61852, 58379, 54614, 50625, 46455, 42130, 37738, 33340,
                28980, 24739, 20704, 16959, 13580, 10636, 8118, 6057, 4378, 3096, 2184, 1479, 961, 599, 358, 205, 113,
                59, 30, 14, 6, 2]
}


#
# Decorating a function with xl_func is all that's required
# to make it callable in Excel as a worksheet function.
#
# @xl_func("int x, string table: float")
def lx(x, table):
    """returns lx at age x for the given table """
    # return l_x[x]
    return l_x[table][x]


# @xl_func("int x, string table: float")
def qx(x, table):
    """returns qx at age x for the given table """
    return (l_x[table][x] - l_x[table][x + 1]) / l_x[table][x]


def px(x, table):
    return 1 - qx(x, table)


def dx(x, table):
    return lx(x, table) * qx(x, table)


def ndx(x, n, table):
    return lx(x, table) - lx(x + n, table)


def nqx(x, n, table):
    return ndx(x, n, table) / lx(x, table)


def npx(x, n, table):
    return lx(x + n, table) / lx(x, table)


def mnqx(x, m, n, table):
    return (lx(x + m, table) - lx(x + m + n, table)) / lx(x, table)


def ex(x, table):
    i = 0
    for k in range(1, len(table) - x):
        i = i + npx(x, k, table)
    return i


def v(i, n):
    return 1 / ((1 + i) ** n)


# pure endowment
def nEx(x, n, i, table):
    return v(i, n) * npx(x, n, table)


def Annuityfactor(x, n, i, table):
    s = 0
    for k in range(0, n):
        s = s + nEx(x, k, i, table)
    return s


# n=term
def SinglePremiumPE(x, n, i, amount, table):
    return nEx(x, n, i, table) * amount


def AnnualPremiumPE(x, n, i, amount, m, table):
    return SinglePremiumPE(x, n, i, amount, table) / Annuityfactor(x, n, i, table)


def Ax(x, taux, table):
    s = 0
    for i in range(1, len(l_x["TD88-90"]) - x):
        s = s + (v(taux, i) * mnqx(x, i - 1, 1, table))
    return s


def nAx(x, taux, table, n):
    s = 0
    for i in range(1, n + 1):
        s = s + (v(taux, i) * mnqx(x, i - 1, 1, table))
    return s


def SinglePremiumTA(x, i, amount, table, n):
    return nAx(x, i, table, n) * amount


def AnnualPremiumTA(x, i, amount, table, m, n):
    return SinglePremiumTA(x, i, amount, table, n) / Annuityfactor(x, m, i, table)


def SinglePremiumWL(x, i, amount, table):
    return Ax(x, i, table) * amount


def AnnualPremiumWL(x, i, amount, table, m):
    return SinglePremiumWL(x, i, amount, table) / Annuityfactor(x, m, i, table)


def SinglePremiumCombinedEndowment(amount, x, taux, tableTD, tableTV, n, k):
    if (k > -1):
        return amount * max(((1 + k) * nEx(x, n, taux, tableTD) + nAx(x, taux, tableTD, n)),
                            ((1 + k) * nEx(x, n, taux, tableTV) + nAx(x, taux, tableTV, n)))
    else:
        return 0


def AnnualPremiumPremiumcombined(x, i, amount, tableTD, tableTV, n, k, m):
    return SinglePremiumCombinedEndowment(amount, x, i, tableTD, tableTV, n, k) / Annuityfactor(x, m, i, tableTD)


def generator_auto(table_tv, table_td, produit, age, i, amount, n, m, k=0):
    single_prem = 0
    annual_prem = 0
    if produit == 0:  # pe
        single_prem, annual_prem = SinglePremiumPE(age, n, i, amount, table_tv), AnnualPremiumPE(age, n, i, amount, m,
                                                                                                 table_tv)
    elif produit == 1:  # TA
        single_prem, annual_prem = SinglePremiumTA(age, i, amount, table_td, n), AnnualPremiumTA(age, i, amount,
                                                                                                 table_td, m, n)
    elif produit == 2:  # WL
        single_prem, annual_prem = SinglePremiumWL(age, i, amount, table_td), AnnualPremiumWL(age, i, amount, table_td,
                                                                                              m)
    elif produit == 3:  # combined
        single_prem, annual_prem = SinglePremiumCombinedEndowment(amount, age, i, table_td, table_tv, n,
                                                                  k), AnnualPremiumPremiumcombined(amount, age, i,
                                                                                                   table_td, table_tv,
                                                                                                   n, k, m)
    return single_prem, annual_prem





app = Flask(__name__)

CORS(app)

#http://127.0.0.1:5000/prime/TV88-90/TD88-90/0/30/0.05/1000/10/4/1
#
@app.get("/prime/<string:tv>/<string:td>/<int:prod>/<int:age>/<float:i>/<int:amount>/<int:n>/<int:m>/<int:k>")
def calcul(tv, td, prod, age, i, amount, n, m, k):
    u, p = generator_auto(tv, td, prod, age, i, amount, n, m, k)
    u = float("{:.2f}".format(u))
    p = float("{:.2f}".format(p))
    return jsonify(u,p)



if __name__ == "__main__":
    app.run(debug=True)
