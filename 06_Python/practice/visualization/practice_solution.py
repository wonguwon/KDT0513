"""
데이터 시각화 실습문제  ―  PRACTICE 1~14 답안예시
"""

import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

from _data import load_merged, sector_order, corr_pairs
from _style import setup, out, saved_files

pd.set_option("display.width", 140)


def line_chart(one):
    """
    한 종목의 종가 추이를 선 그래프로 그려 저장한다.

    Args:
        one : 한 종목만 뽑아 날짜순으로 정렬한 DataFrame (750행)
    Returns:
        str : 저장한 파일 경로
    """

    fig, ax = plt.subplots(figsize=(12, 4))
    ax.plot(one["date"], one["close"])

    ax.set_title("가온전자 주가 추이")
    ax.set_xlabel("날짜")
    ax.set_ylabel("종가 (원)")

    ax.grid(alpha=0.3)

    path = out("01_line.png")
    fig.savefig(path, dpi=120)

    plt.close(fig)
    return path


def minus_chart(one):
    """
    한 종목의 앞 60일 등락률을 선 그래프로 그리고 0 기준선을 얹는다.

    Args:
        one : 한 종목의 DataFrame (750행)
    Returns:
        str : 저장한 파일 경로
    """
    fig, ax = plt.subplots(figsize=(10, 3))

    ax.plot(one["date"].iloc[:60], one["changeRate"].iloc[:60], marker=".")

    ax.axhline(0, color="gray", lw=0.8)

    ax.set_title("가온전자 일간 등락률")
    ax.set_ylabel("등락률 (%)")

    path = out("02_minus.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def grid_chart(df, codes):
    """
    네 종목의 종가 추이를 2행 2열로 나란히 그린다.

    Args:
        df    : 통합 데이터 (90,000행)
        codes : 그릴 종목코드 네 개
    Returns:
        str : 저장한 파일 경로
    """
    fig, axes = plt.subplots(2, 2, figsize=(13, 6), sharex=True)

    for ax, code in zip(axes.flat, codes):
        sub = df[df["code"] == code].sort_values("date")
        ax.plot(sub["date"], sub["close"], lw=1)
        ax.set_title(f"{sub['name'].iloc[0]} ({code})", fontsize=10)
        ax.grid(alpha=0.3)

    fig.suptitle("종목별 주가 추이")

    fig.tight_layout()

    path = out("03_grid.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def hist_chart(df):
    """
    일간 수익률과 종가의 분포를 히스토그램 두 장으로 나란히 그린다.

    Args:
        df : 통합 데이터 (90,000행)
    Returns:
        str : 저장한 파일 경로
    """
    fig, axes = plt.subplots(1, 2, figsize=(13, 4))

    axes[0].hist(df["ret"].dropna(), bins=60, color="steelblue")
    axes[0].set_title("일간 수익률 분포")
    axes[0].set_xlabel("수익률 (%)")
    axes[0].set_ylabel("빈도")

    axes[1].hist(df["close"], bins=60, color="indianred")
    axes[1].set_title("종가 분포")
    axes[1].set_xlabel("종가 (원)")

    fig.tight_layout()
    path = out("04_hist.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def box_chart(df):
    """
    섹터별 일간 수익률 분포를 박스플롯으로 그린다.

    Args:
        df : 통합 데이터 (90,000행)
    Returns:
        str : 저장한 파일 경로
    """
    fig, ax = plt.subplots(figsize=(13, 5))

    sns.boxplot(data=df, x="sector", y="ret", ax=ax)

    ax.set_title("섹터별 일간 수익률 분포")
    ax.set_xlabel("섹터")
    ax.set_ylabel("수익률 (%)")

    ax.tick_params(axis="x", rotation=30)

    path = out("05_box.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def count_outliers_by_sector(df):
    """
    섹터별 IQR 기준으로 수염 밖에 놓이는 값이 몇 건인지 센다.

    Args:
        df : 통합 데이터 (90,000행)
    Returns:
        int : 전 섹터의 이상치 건수 합계
    """
    total = 0

    for _, g in df.groupby("sector"):
        q1, q3 = g["ret"].quantile([0.25, 0.75])
        iqr = q3 - q1

        outlier = (g["ret"] < q1 - 1.5 * iqr) | (g["ret"] > q3 + 1.5 * iqr)
        total += int(outlier.sum())

    return total


def scatter_chart(df):
    """
    거래량과 수익률의 산점도를 alpha 기본값 / 0.15 로 나란히 그린다.

    Args:
        df : 통합 데이터 (90,000행)
    Returns:
        str : 저장한 파일 경로
    """
    sample = df.dropna(subset=["ret"]).sample(5000, random_state=42)

    fig, axes = plt.subplots(1, 2, figsize=(13, 4.5))

    axes[0].scatter(sample["volume"], sample["ret"], s=6)
    axes[0].set_title("alpha 기본값 (겹쳐서 새까맣다)")
    axes[0].set_xlabel("거래량")
    axes[0].set_ylabel("수익률 (%)")

    axes[1].scatter(sample["volume"], sample["ret"], s=6, alpha=0.15)
    axes[1].set_title("alpha=0.15 (밀집 구간이 보인다)")
    axes[1].set_xlabel("거래량")

    fig.tight_layout()
    path = out("06_scatter.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def bar_chart(df):
    """
    섹터별 일간 수익률을 막대그래프로 그린다.

    Args:
        df : 통합 데이터 (90,000행)
    Returns:
        str : 저장한 파일 경로
    """
    fig, ax = plt.subplots(figsize=(11, 4))

    sns.barplot(data=df, x="sector", y="ret", ax=ax)

    ax.axhline(0, color="gray", lw=0.8)
    ax.set_title("섹터별 평균 일간 수익률")
    ax.set_xlabel("섹터")
    ax.set_ylabel("평균 수익률 (%)")
    ax.tick_params(axis="x", rotation=30)

    path = out("07_bar.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def corr_matrix(df, order):
    """
    종목끼리 수익률이 얼마나 같이 움직이는지를 담은 상관 행렬을 만든다.

    Args:
        df    : 통합 데이터 (90,000행)
        order : 열을 세울 순서. 같은 섹터 종목이 이웃하게 정렬된 종목코드 목록
    Returns:
        DataFrame : 120 x 120 상관 행렬
    """
    pivot = df.pivot_table(index="date", columns="code", values="ret")

    pivot = pivot[order]

    return pivot.corr()


def heatmap_pair(corr):
    """
    같은 상관 행렬을 center 없이 / center=0 으로 나란히 그려 비교한다.

    Args:
        corr : 120 x 120 상관 행렬
    Returns:
        str : 저장한 파일 경로
    """
    fig, axes = plt.subplots(1, 2, figsize=(13, 5))

    sns.heatmap(corr, cmap="coolwarm",
                xticklabels=False, yticklabels=False, ax=axes[0])
    axes[0].set_title("center 미지정 (과장되어 보인다)")

    sns.heatmap(corr, cmap="coolwarm", center=0, vmin=-1, vmax=1,
                xticklabels=False, yticklabels=False, ax=axes[1])
    axes[1].set_title("center=0, vmin/vmax 지정")

    fig.tight_layout()
    path = out("08_heatmap.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def sector_block(pairs):
    """
    같은 섹터 쌍과 다른 섹터 쌍의 평균 상관을 구한다.

    Args:
        pairs : a · b · corr · same_sector 네 열짜리 표 (7,140행)
    Returns:
        (float, float) : (같은 섹터 평균, 다른 섹터 평균)
    """
    means = pairs.groupby("same_sector")["corr"].mean()

    return float(means.loc[True]), float(means.loc[False])


def axis_illusion(one):
    """
    같은 데이터를 y축 0부터 / 자동 범위로 나란히 그린다.

    Args:
        one : 한 종목의 최근 120거래일 (120행)
    Returns:
        str : 저장한 파일 경로
    """
    fig, axes = plt.subplots(1, 2, figsize=(13, 4))

    axes[0].plot(one["date"], one["close"])

    axes[0].set_ylim(0, one["close"].max() * 1.1)
    axes[0].set_title("y축 0부터 (평평해 보인다)")
    axes[0].set_ylabel("종가 (원)")

    axes[1].plot(one["date"], one["close"], color="crimson")
    axes[1].set_title("y축 자동 (급등락해 보인다)")

    fig.tight_layout()
    path = out("09_axis.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


def outlier_scale(one):
    """
    종가 한 칸을 100배로 만든 표와 원본을 나란히 그린다.

    Args:
        one : 한 종목의 DataFrame (750행)
    Returns:
        str : 저장한 파일 경로
    """
    polluted = one.copy()

    polluted.iloc[300, polluted.columns.get_loc("close")] *= 100

    fig, axes = plt.subplots(1, 2, figsize=(13, 4))

    axes[0].plot(polluted["date"], polluted["close"])
    axes[0].set_title("이상치 1건 포함 (나머지가 바닥에 붙는다)")
    axes[0].set_ylabel("종가 (원)")

    axes[1].plot(one["date"], one["close"], color="seagreen")
    axes[1].set_title("정제 후")

    fig.tight_layout()
    path = out("10_outlier.png")
    fig.savefig(path, dpi=120)
    plt.close(fig)
    return path


ANSWER = """
히트맵의 색은 상관계수의 '절대적인 크기' 를 보여준다.
그런데 이 데이터는 전체 평균 상관이 0.1708 로, 모든 종목이 어느 정도씩 함께 움직인다.
같은 섹터(0.2227)와 다른 섹터(0.1650)의 차이는 0.0577 밖에 안 되므로,
-1 ~ 1 을 다 담은 색 범위 안에서 그 차이는 거의 같은 색으로 칠해진다.
그래서 신호가 있는데도 눈에는 얼룩덜룩한 붉은 판으로만 보인다.

무엇으로 확인했나:
그림이 아니라 숫자로 확인했다.
7,140개의 종목 쌍을 같은 섹터 / 다른 섹터로 나눠 각각의 평균 상관을 계산했더니
0.2227 대 0.1650 으로 분명한 차이가 있었다.
그림에서 안 보인다고 신호가 없는 것이 아니라, 무엇에 가려져 있는지를 따져야 한다.
"""


def step(fn, *args):
    """앞 문제가 미완성이면 건너뛰고, 에러가 나도 실행이 멈추지 않게 감싼다."""
    if any(a is None for a in args):
        print("  [건너뜀] 앞 문제를 먼저 완성하세요.")
        return None
    try:
        result = fn(*args)
    except Exception as e:
        print(f"  [미완성] {type(e).__name__}: {str(e).splitlines()[0][:90]}")
        return None
    if result is None:
        print("  [미완성] 함수가 아직 값을 돌려주지 않습니다.")
        return None
    return result


def section(title):
    print("\n" + "=" * 68)
    print(f" {title}")
    print("=" * 68)


def show_file(path):
    """저장된 그림의 경로와 크기를 확인한다. 파일이 없으면 실패로 알린다."""
    import os
    if path is None:
        return
    if os.path.exists(path):
        kb = os.path.getsize(path) / 1024
        print(f"  저장됨 : output/{os.path.basename(path)}  ({kb:,.0f} KB)")
    else:
        print(f"  ⚠ 파일이 없습니다 : {path}")


if __name__ == "__main__":

    setup()

    df = load_merged()
    one = df[df["code"] == "G0001"].sort_values("date")

    print(f"\n통합 데이터  {len(df):>8,}행   {df['code'].nunique()}종목 x "
          f"{len(df) // df['code'].nunique()}거래일   섹터 {df['sector'].nunique()}종")
    print(f"수익률 결측  {df['ret'].isna().sum():>8,}건   "
          f"= 종목당 1건 (첫날은 비교 대상이 없다)")

    section("PRACTICE 1. 선 그래프 한 장")
    show_file(step(line_chart, one))

    section("PRACTICE 2. 음수가 섞인 축")
    show_file(step(minus_chart, one))
    print("  y축의 음수가 '-1.5' 처럼 보이면 정상입니다. 네모로 보이면 폰트 설정 문제입니다.")

    section("PRACTICE 3. 네 개를 나란히")
    show_file(step(grid_chart, df, ["G0001", "G0002", "G0003", "G0004"]))

    section("PRACTICE 4. 분포 보기 - 히스토그램")
    show_file(step(hist_chart, df))
    print(f"  수익률 : 평균 {df['ret'].mean():.3f}%, 표준편차 {df['ret'].std():.3f}%")
    print(f"  종가   : 중앙값 {df['close'].median():,.0f}원, 최댓값 {df['close'].max():,.0f}원")

    section("PRACTICE 5. 섹터별 박스플롯")
    show_file(step(box_chart, df))

    section("PRACTICE 6. 박스플롯이 한 계산을 숫자로 검산하기")
    n_sector = step(count_outliers_by_sector, df)
    if n_sector is not None:
        q1, q3 = df["ret"].quantile([0.25, 0.75])
        iqr = q3 - q1
        n_all = int(((df["ret"] < q1 - 1.5 * iqr) | (df["ret"] > q3 + 1.5 * iqr)).sum())
        print(f"  전체를 한 덩어리로 봤을 때 : {n_all:>6,}건   "
              f"(Q1 {q1:.3f}  Q3 {q3:.3f}  IQR {iqr:.3f})")
        print(f"  섹터별로 따로 봤을 때      : {n_sector:>6,}건   <- 그림이 하는 계산")
        print(f"  차이                       : {n_all - n_sector:>6,}건")
        print("\n  박스를 섹터별로 그렸으니 기준선도 섹터별로 다시 그어진다.")
        print("  '전체 기준으로는 이상치인데 자기 섹터 안에서는 평범한 값' 이 있어서 어긋난다.")

    section("PRACTICE 7. 산점도와 alpha")
    show_file(step(scatter_chart, df))

    section("PRACTICE 8. 막대그래프")
    show_file(step(bar_chart, df))
    by_sector = df.groupby("sector")["ret"].agg(["mean", "count"])
    print("\n  숫자로 대조 (막대 높이는 sum 이 아니라 mean 이다):")
    print(by_sector.round(4).head(4).to_string())

    section("PRACTICE 9. 상관 행렬 만들기")
    order = sector_order(df)
    corr = step(corr_matrix, df, order)
    if corr is not None:
        print(f"  상관 행렬 : {corr.shape}   (종목 x 종목)")
        print(f"  대각선 값 : {corr.iloc[0, 0]:.1f}  (자기 자신과의 상관이라 언제나 1.0)")
        print(f"  열 순서   : {corr.columns[:3].tolist()} ...  섹터 순으로 세워졌는가")

    section("PRACTICE 10. 히트맵과 center=0")
    show_file(step(heatmap_pair, corr))
    print("  두 그림을 나란히 열어 비교해 보세요. 같은 데이터, 다른 인상입니다.")

    section("PRACTICE 11. 섹터 블록이 보이는가 - 숫자로 확인")
    pairs = corr_pairs(corr, df) if corr is not None else None
    if pairs is not None:
        print(f"  종목 쌍 : {len(pairs):,}개   "
              f"(같은 섹터 {int(pairs['same_sector'].sum()):,} / "
              f"다른 섹터 {int((~pairs['same_sector']).sum()):,})")
    result = step(sector_block, pairs)
    if result is not None:
        same, diff = result
        print(f"  같은 섹터 평균 상관 : {same:>8.4f}")
        print(f"  다른 섹터 평균 상관 : {diff:>8.4f}")
        print(f"  차이                : {same - diff:>+8.4f}")
        print(f"  전체 평균 상관      : {pairs['corr'].mean():>8.4f}   <- 서술형의 열쇠")

    section("PRACTICE 12. 축 범위가 만드는 착시")
    recent = one.tail(120)
    show_file(step(axis_illusion, recent))
    lo, hi = recent["close"].min(), recent["close"].max()
    print(f"  같은 데이터다. 실제 변동폭은 {lo:,.0f} ~ {hi:,.0f}원 ({(hi / lo - 1) * 100:.1f}%)")

    section("PRACTICE 13. 이상치 하나가 스케일을 망친다")
    before_300 = one["close"].iloc[300]
    show_file(step(outlier_scale, one))
    print(f"  750개 중 단 1개 때문에 나머지 749개가 평평한 선이 된다.")
    print(f"  301번째 종가 : 호출 전 {before_300:,}원  ->  호출 후 "
          f"{one['close'].iloc[300]:,}원")
    print(f"  원본이 바뀌지 않았는가 : "
          f"{'통과' if one['close'].iloc[300] == before_300 else '실패 - copy() 를 확인할 것'}")

    section("PRACTICE 14. 서술형")
    print("  [제출한 답]")
    print("  " + ANSWER.strip().replace("\n", "\n  "))

    print("\n" + "=" * 68)
    print(" 저장된 그림")
    print("=" * 68)
    for f in saved_files():
        print(f"    output/{f}")
