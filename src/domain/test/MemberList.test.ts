import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;
  let member2: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      discount: 50,
    });
    member2 = new Member({
      name: "member2",
      documentId: "98765432",
      plan: "full",
      monthlyFee: 1000,
      discount: 10,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    list.add(member2);
    expect(list.totalFees()).toBe(2500);
  });

  test("total discount", () => {
    list.add(member);
    list.add(member2);
    expect(list.totalDiscounted()).toBe(1650);
  });

  test("update member fee", () => {
    list.add(member);
    list.updateFee(member.documentId, 2000);
    expect(member.monthlyFee).toEqual(2000);
  });

  test("dont update id that isnt on the list", () => {
    list.add(member);
    expect(() => list.updateFee("56489531", 4854)).toThrow();
  });
});
