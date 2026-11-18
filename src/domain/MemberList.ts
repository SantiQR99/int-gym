import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    const itemPos: number = this.#items.findIndex((miembro) =>miembro.documentId==_documentId);
    if(itemPos==-1){
      throw new Error("No existe miembro con ese id")
    }
    this.#items[itemPos].monthlyFee = _fee;

    /*const item = this.#items.find((member) => member.documentId == _documentId);
    if(!item){
      throw new Error("No existe miembro con ese id")
    }
    item.documentId = _documentId;*/
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    return this.#items.reduce((total, member) => total + (100-member.discount)*member.monthlyFee/100, 0);
  }
}
